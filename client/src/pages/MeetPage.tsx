import React, { useState } from "react";
import io from "socket.io-client";
import { useRef } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import MeetGrid from "components/meet/MeetGrid";
import styled from "styled-components";
import MeetFooter from "components/meet/MeetFooter";
import Sidebar from "components/meet/MeetSideBar";

interface MeetParams {
  roomId: string;
}

const Meet = () => {
  const [socket, setSocket] = useState<SocketIOClient.Socket>();
  const [users, setUsers] = useState<Array<IWebRTCUser>>([]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { roomId } = useParams<MeetParams>();

  let localVideoRef = useRef<HTMLVideoElement>(null);

  let sendPC: RTCPeerConnection;
  let receivePCs: { [socketId: string]: RTCPeerConnection };

  const pc_config = {
    iceServers: [
      // {
      //   urls: 'stun:[STUN_IP]:[PORT]',
      //   'credentials': '[YOR CREDENTIALS]',
      //   'username': '[USERNAME]'
      // },
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  };

  useEffect(() => {
    let newSocket = io.connect("http://localhost:8080");
    let localStream: MediaStream;

    newSocket.on("userEnter", (data: { id: string }) => {
      createReceivePC(data.id, newSocket);
    });

    newSocket.on("allUsers", (data: { users: Array<{ id: string }> }) => {
      let len = data.users.length;
      for (let i = 0; i < len; i++) {
        createReceivePC(data.users[i].id, newSocket);
      }
    });

    newSocket.on("userExit", (data: { id: string }) => {
      receivePCs[data.id].close();
      delete receivePCs[data.id];
      setUsers((users) => users.filter((user) => user.id !== data.id));
    });

    newSocket.on(
      "getSenderAnswer",
      async (data: { sdp: RTCSessionDescription }) => {
        try {
          console.log("get sender answer");
          console.log(data.sdp);
          await sendPC.setRemoteDescription(
            new RTCSessionDescription(data.sdp)
          );
        } catch (error) {
          console.log(error);
        }
      }
    );

    newSocket.on(
      "getSenderCandidate",
      async (data: { candidate: RTCIceCandidateInit }) => {
        try {
          console.log("get sender candidate");
          if (!data.candidate) return;
          sendPC.addIceCandidate(new RTCIceCandidate(data.candidate));
          console.log("candidate add success");
        } catch (error) {
          console.log(error);
        }
      }
    );

    newSocket.on(
      "getReceiverAnswer",
      async (data: { id: string; sdp: RTCSessionDescription }) => {
        try {
          console.log(`get socketID(${data.id})'s answer`);
          let pc: RTCPeerConnection = receivePCs[data.id];
          await pc.setRemoteDescription(data.sdp);
          console.log(`socketID(${data.id})'s set remote sdp success`);
        } catch (error) {
          console.log(error);
        }
      }
    );

    newSocket.on(
      "getReceiverCandidate",
      async (data: { id: string; candidate: RTCIceCandidateInit }) => {
        try {
          console.log(data);
          console.log(`get socketID(${data.id})'s candidate`);
          let pc: RTCPeerConnection = receivePCs[data.id];
          if (!data.candidate) return;
          pc.addIceCandidate(new RTCIceCandidate(data.candidate));
          console.log(`socketID(${data.id})'s candidate add success`);
        } catch (error) {
          console.log(error);
        }
      }
    );

    setSocket(newSocket);
    console.log("newSocket", newSocket);

    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: {
          width: 240,
          // height: 240,
        },
      })
      .then((stream) => {
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;

        localStream = stream;

        // stream 정보에 내 데이터도 추가
        const myStream = {
          id: "myId",
          stream,
        };
        setUsers(users.concat(myStream));

        sendPC = createSenderPeerConnection(newSocket, localStream);
        createSenderOffer(newSocket);

        newSocket.emit("joinRoom", {
          id: newSocket.id,
          roomId,
        });
      })
      .catch((error) => {
        console.log(`getUserMedia error: ${error}`);
      });
  }, []);

  const createReceivePC = (id: string, newSocket: SocketIOClient.Socket) => {
    try {
      console.log(`socketID(${id}) user entered`);
      let pc = createReceiverPeerConnection(id, newSocket);
      createReceiverOffer(pc, newSocket, id);
    } catch (error) {
      console.log(error);
    }
  };

  const createSenderOffer = async (newSocket: SocketIOClient.Socket) => {
    try {
      let sdp = await sendPC.createOffer({
        offerToReceiveAudio: false,
        offerToReceiveVideo: false,
      });
      console.log("create sender offer success");
      await sendPC.setLocalDescription(new RTCSessionDescription(sdp));

      newSocket.emit("senderOffer", {
        sdp,
        senderSocketID: newSocket.id,
        roomId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createReceiverOffer = async (
    pc: RTCPeerConnection,
    newSocket: SocketIOClient.Socket,
    senderSocketID: string
  ) => {
    try {
      let sdp = await pc.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });
      console.log("create receiver offer success");
      await pc.setLocalDescription(new RTCSessionDescription(sdp));

      newSocket.emit("receiverOffer", {
        sdp,
        receiverSocketID: newSocket.id,
        senderSocketID,
        roomId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createSenderPeerConnection = (
    newSocket: SocketIOClient.Socket,
    localStream: MediaStream
  ): RTCPeerConnection => {
    let pc = new RTCPeerConnection(pc_config);

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        console.log("sender PC onicecandidate");
        newSocket.emit("senderCandidate", {
          candidate: e.candidate,
          senderSocketID: newSocket.id,
        });
      }
    };

    pc.oniceconnectionstatechange = (e) => {
      console.log(e);
    };

    if (localStream) {
      console.log("localstream add");
      localStream.getTracks().forEach((track) => {
        pc.addTrack(track, localStream);
      });
    } else {
      console.log("no local stream");
    }

    // return pc
    return pc;
  };

  const createReceiverPeerConnection = (
    socketID: string,
    newSocket: SocketIOClient.Socket
  ): RTCPeerConnection => {
    let pc = new RTCPeerConnection(pc_config);

    // add pc to peerConnections object
    receivePCs = { ...receivePCs, [socketID]: pc };

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        console.log("receiver PC onicecandidate");
        newSocket.emit("receiverCandidate", {
          candidate: e.candidate,
          receiverSocketID: newSocket.id,
          senderSocketID: socketID,
        });
      }
    };

    pc.oniceconnectionstatechange = (e) => {
      console.log(e);
    };

    pc.ontrack = (e) => {
      console.log("ontrack success");
      setUsers((oldUsers) => oldUsers.filter((user) => user.id !== socketID));
      setUsers((oldUsers) => [
        ...oldUsers,
        {
          id: socketID,
          stream: e.streams[0],
        },
      ]);
    };

    // return pc
    return pc;
  };

  return (
    <MeetPageBlock>
      <Wrapper>
        <main>
          <MeetGrid users={users} sidebarOpen={sidebarOpen} />
        </main>
        <Sidebar visible={sidebarOpen} />
      </Wrapper>
      <MeetFooter />
    </MeetPageBlock>
  );
};

const MeetPageBlock = styled.div`
  height: 100%;
  background: #212121;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  main {
    height: 100%;
    position: relative;
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }
`;

export default Meet;
