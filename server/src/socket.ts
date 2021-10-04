import http from "http";
import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import wrtc from "wrtc";
import Meet from "./models/meet";

interface IUserState {
  id: string;
  stream: MediaStream;
  userId: string;
  name: string;
  muted: boolean;
}

interface IUsers {
  [key: string]: IUserState[];
}

interface ISenderPC {
  id: string;
  pc: RTCPeerConnection;
}

interface ISenderPCs {
  [key: string]: ISenderPC[];
}

export default function (server: http.Server) {
  let receiverPCs = {};
  let senderPCs: ISenderPCs = {};
  // 유저 목록
  const users: IUsers = {};
  const socketToRoom = {};

  const pc_config = {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  };

  const isIncluded = (array: IUserState[], id: string) => {
    for (const arr of array) {
      if (arr.id === id) return true;
    }
    return false;
  };

  const createReceiverPeerConnection = (
    socketID: string,
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>,
    meetId: string,
    userId: string,
    name: string
  ): RTCPeerConnection => {
    let pc: RTCPeerConnection = new wrtc.RTCPeerConnection(pc_config);

    if (receiverPCs[socketID]) receiverPCs[socketID] = pc;
    else receiverPCs = { ...receiverPCs, [socketID]: pc };

    pc.onicecandidate = (e: RTCPeerConnectionIceEvent) => {
      socket.to(socketID).emit("getSenderCandidate", {
        candidate: e.candidate,
      });
    };

    pc.oniceconnectionstatechange = (e) => {
      // console.log(
      //   "Receiver oniceconnectionstatechange",
      //   e.target.iceConnectionState
      // );
    };

    pc.ontrack = (e: RTCTrackEvent) => {
      if (users[meetId]) {
        if (!isIncluded(users[meetId], socketID)) {
          users[meetId].push({
            id: socketID,
            stream: e.streams[0],
            userId,
            name,
            muted: false,
          });
        } else return;
      } else {
        users[meetId] = [
          {
            id: socketID,
            stream: e.streams[0],
            userId,
            name,
            muted: false,
          },
        ];
      }
      socket.broadcast
        .to(meetId)
        .emit("userEnter", { id: socketID, name, muted: false });
    };

    return pc;
  };

  const createSenderPeerConnection = (
    receiverSocketID,
    senderSocketID,
    socket,
    meetId
  ) => {
    let pc = new wrtc.RTCPeerConnection(pc_config);

    if (senderPCs[senderSocketID]) {
      senderPCs[senderSocketID].filter((user) => user.id !== receiverSocketID);
      senderPCs[senderSocketID].push({ id: receiverSocketID, pc: pc });
    } else
      senderPCs = {
        ...senderPCs,
        [senderSocketID]: [{ id: receiverSocketID, pc: pc }],
      };

    pc.onicecandidate = (e) => {
      socket.to(receiverSocketID).emit("getReceiverCandidate", {
        id: senderSocketID,
        candidate: e.candidate,
      });
    };

    pc.oniceconnectionstatechange = (e) => {
      // console.log(
      //   "Sender oniceconnectionstatechange",
      //   e.target.iceConnectionState
      // );
    };

    const sendUser = users[meetId].filter((user) => user.id === senderSocketID);
    sendUser[0].stream.getTracks().forEach((track) => {
      pc.addTrack(track, sendUser[0].stream);
    });

    return pc;
  };

  const getOtherUsersInRoom = (socketID: string, meetId: string) => {
    const allUsers = [];
    if (!users[meetId]) return allUsers;

    for (const user of users[meetId]) {
      if (user.id === socketID) continue;
      allUsers.push({
        id: user.id,
        name: user.name,
        muted: user.muted,
      });
    }
    return allUsers;
  };

  const deleteUser = async (
    socketID: string,
    meetId: string,
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>
  ) => {
    const roomUsers = users[meetId];
    if (!roomUsers) return;

    // 나갈려고하는 user의 id를 찾아서 호스트 인지 체크
    const userId = roomUsers.filter((user) => user.id === socketID)[0].userId;
    try {
      const meet = await Meet.findOne({ _id: meetId });
      if (meet.host.toString() === userId) {
        // io.to(meetId).emit("hostLeave", { message: "호스트가 종료했습니다." });
        // meet.deleteOne();
      }
    } catch (e) {
      console.log("deleteUser 에러", e);
    }

    users[meetId] = roomUsers.filter((user) => user.id !== socketID);
    if (users[meetId].length === 0) {
      delete users[meetId];
    }
    delete socketToRoom[socketID];
  };

  const closeRecevierPC = (socketID: string) => {
    if (!receiverPCs[socketID]) return;

    receiverPCs[socketID].close();
    delete receiverPCs[socketID];
  };

  const closeSenderPCs = (socketID: string) => {
    if (!senderPCs[socketID]) return;

    console.log(senderPCs);

    for (const sPC of senderPCs[socketID]) {
      sPC.pc.close();
      const _senderPCs = senderPCs[sPC.id];
      const senderPC = _senderPCs.filter((pc) => pc.id === socketID);
      if (senderPC[0]) {
        senderPC[0].pc.close();
        senderPCs[sPC.id] = _senderPCs.filter((pc) => pc.id !== socketID);
      }
    }
    delete senderPCs[socketID];
    console.log(senderPCs);
  };

  // socket 서버 생성
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true,
    },
    allowEIO3: true, // socket io Unsupported protocol version 에러 방지
  });

  io.on("connection", (socket) => {
    // 방에 입장
    socket.on("joinRoom", (data) => {
      try {
        let allUsers = getOtherUsersInRoom(data.id, data.meetId);
        io.to(data.id).emit("allUsers", { users: allUsers });
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("senderOffer", async (data) => {
      try {
        socketToRoom[data.senderSocketID] = data.meetId;
        let pc = createReceiverPeerConnection(
          data.senderSocketID,
          socket,
          data.meetId,
          data.userId,
          data.name
        );
        await pc.setRemoteDescription(data.sdp);
        let sdp = await pc.createAnswer({
          offerToReceiveAudio: true,
          offerToReceiveVideo: true,
        });

        await pc.setLocalDescription(sdp);
        socket.join(data.meetId);
        io.to(data.senderSocketID).emit("getSenderAnswer", { sdp });
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("senderCandidate", async (data) => {
      try {
        let pc = receiverPCs[data.senderSocketID];
        await pc.addIceCandidate(new wrtc.RTCIceCandidate(data.candidate));
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("receiverOffer", async (data) => {
      try {
        let pc = createSenderPeerConnection(
          data.receiverSocketID,
          data.senderSocketID,
          socket,
          data.meetId
        );
        await pc.setRemoteDescription(data.sdp);
        let sdp = await pc.createAnswer({
          offerToReceiveAudio: false,
          offerToReceiveVideo: false,
        });
        await pc.setLocalDescription(sdp);
        io.to(data.receiverSocketID).emit("getReceiverAnswer", {
          id: data.senderSocketID,
          sdp,
        });
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("receiverCandidate", async (data) => {
      try {
        const senderPC = senderPCs[data.senderSocketID].filter(
          (sPC) => sPC.id === data.receiverSocketID
        );
        await senderPC[0].pc.addIceCandidate(
          new wrtc.RTCIceCandidate(data.candidate)
        );
      } catch (error) {
        console.log(error);
      }
    });

    socket.on(
      "sendChatMessage",
      (messageObject: { meetId: string; message: string; name: string }) => {
        io.to(messageObject.meetId).emit("receiveChatMessage", messageObject);
      }
    );

    socket.on(
      "sendToggleMuted",
      (payload: { userSocketId: string; meetId: string; muted: boolean }) => {
        users[payload.meetId].forEach((user) => {
          if (user.id === payload.userSocketId) {
            user.muted = payload.muted;
          }
        });
        io.to(payload.meetId).emit("receiveToggleMuted", payload);
      }
    );

    socket.on("disconnect", async () => {
      try {
        const meetId = socketToRoom[socket.id];
        deleteUser(socket.id, meetId, io);
        closeRecevierPC(socket.id);
        closeSenderPCs(socket.id);
        socket.broadcast.to(meetId).emit("userExit", { id: socket.id });
      } catch (error) {
        console.log(error);
      }
    });
  });
}
