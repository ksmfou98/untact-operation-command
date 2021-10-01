import http from "http";
import { Server } from "socket.io";
import wrtc from "wrtc";
import Meet from "./models/meet";

export default function (server: http.Server) {
  let receiverPCs = {};
  let senderPCs = {};
  // 유저 목록
  let users = {};
  let socketToRoom = {};

  const pc_config = {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  };

  const isIncluded = (array, id) => {
    let len = array.length;
    for (let i = 0; i < len; i++) {
      if (array[i].id === id) return true;
    }
    return false;
  };

  const createReceiverPeerConnection = (socketID, socket, meetId, userId) => {
    let pc = new wrtc.RTCPeerConnection(pc_config);

    if (receiverPCs[socketID]) receiverPCs[socketID] = pc;
    else receiverPCs = { ...receiverPCs, [socketID]: pc };

    pc.onicecandidate = (e) => {
      //console.log(`socketID: ${socketID}'s receiverPeerConnection icecandidate`);
      socket.to(socketID).emit("getSenderCandidate", {
        candidate: e.candidate,
      });
    };

    pc.oniceconnectionstatechange = (e) => {
      //console.log(e);
      // console.log(
      //   "Receiver oniceconnectionstatechange",
      //   e.target.iceConnectionState
      // );
    };

    pc.ontrack = (e) => {
      e.streams[0].getTracks().forEach((track) => {});
      if (users[meetId]) {
        if (!isIncluded(users[meetId], socketID)) {
          users[meetId].push({
            id: socketID,
            stream: e.streams[0],
            userId,
          });
        } else return;
      } else {
        users[meetId] = [
          {
            id: socketID,
            stream: e.streams[0],
            userId,
          },
        ];
      }
      socket.broadcast.to(meetId).emit("userEnter", { id: socketID });
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
      //console.log(`socketID: ${receiverSocketID}'s senderPeerConnection icecandidate`);
      socket.to(receiverSocketID).emit("getReceiverCandidate", {
        id: senderSocketID,
        candidate: e.candidate,
      });
    };

    pc.oniceconnectionstatechange = (e) => {
      //console.log(e);
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

  const getOtherUsersInRoom = (socketID, meetId) => {
    let allUsers = [];

    if (!users[meetId]) return allUsers;

    let len = users[meetId].length;
    for (let i = 0; i < len; i++) {
      if (users[meetId][i].id === socketID) continue;
      allUsers.push({ id: users[meetId][i].id });
    }

    return allUsers;
  };

  const deleteUser = async (socketID, meetId, io) => {
    let roomUsers = users[meetId];
    if (!roomUsers) return;

    // 나갈려고하는 user의 id를 찾아서 호스트 인지 체크
    const userId = roomUsers.filter((user) => user.id === socketID)[0].userId;
    try {
      const meet = await Meet.findOne({ _id: meetId });
      console.log(meet);
      if (meet.host.toString() === userId) {
        io.to(meetId).emit("hostLeave", { message: "호스트가 종료했습니다." });
        meet.deleteOne();
      }
    } catch (e) {
      console.log("deleteUser 에러", e);
    }

    roomUsers = roomUsers.filter((user) => user.id !== socketID);
    users[meetId] = roomUsers;
    if (roomUsers.length === 0) {
      delete users[meetId];
    }
    delete socketToRoom[socketID];
  };

  const closeRecevierPC = (socketID) => {
    if (!receiverPCs[socketID]) return;

    receiverPCs[socketID].close();
    delete receiverPCs[socketID];
  };

  const closeSenderPCs = (socketID) => {
    if (!senderPCs[socketID]) return;

    let len = senderPCs[socketID].length;
    for (let i = 0; i < len; i++) {
      senderPCs[socketID][i].pc.close();
      let _senderPCs = senderPCs[senderPCs[socketID][i].id];
      let senderPC = _senderPCs.filter((sPC) => sPC.id === socketID);
      if (senderPC[0]) {
        senderPC[0].pc.close();
        senderPCs[senderPCs[socketID][i].id] = _senderPCs.filter(
          (sPC) => sPC.id !== socketID
        );
      }
    }

    delete senderPCs[socketID];
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
          data.userId
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

    socket.on("disconnect", async () => {
      try {
        let meetId = socketToRoom[socket.id];
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
