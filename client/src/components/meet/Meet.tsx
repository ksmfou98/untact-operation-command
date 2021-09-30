import React, { useState } from "react";
import io from "socket.io-client";
import { useEffect } from "react";
import { useParams } from "react-router";
import MeetGrid from "components/meet/MeetGrid";
import styled from "styled-components";
import MeetFooter from "components/meet/MeetFooter";
import MeetSidebar from "components/meet/MeetSideBar";
import { SERVER_URL } from "lib/config";
import useFindMeet from "hooks/meet/useFindMeet";
import MeetNotFound from "components/meet/MeetNotFound";

let newSocket = io.connect(SERVER_URL); // 소켓 연결

interface MeetParams {
  meetId: string;
}

const MeetPage = () => {
  const [users, setUsers] = useState<Array<IWebRTCUser>>([]);
  const [mySessionId, setMySessionId] = useState<string>("");
  const [{ muted, videoDisabled }, setMediaState] = useState({
    muted: false,
    videoDisabled: false,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { meetId } = useParams<MeetParams>();

  const { exist, meet } = useFindMeet(meetId);

  let sendPC: RTCPeerConnection;
  let receivePCs: { [socketId: string]: RTCPeerConnection };

  const pc_config = {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  };

  useEffect(() => {
    let localStream: MediaStream;

    // 사용자에게 미디어 입력 장치 사용권한을 가져온 후 스트림을 생성한다.
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then((stream) => {
        localStream = stream;
        // stream 정보에 내 데이터도 추가
        console.log("stream", stream);
        const myStream = {
          id: newSocket.id,
          stream,
          muted: false,
          videoOff: false,
        };
        setUsers(users.concat(myStream));
        setMySessionId(myStream.id);

        // eslint-disable-next-line
        sendPC = createSenderPeerConnection(newSocket, localStream);
        createSenderOffer(newSocket);

        newSocket.emit("joinRoom", {
          id: newSocket.id,
          meetId,
        });
      })
      .catch((error) => {
        console.log(`getUserMedia error: ${error}`);
      });

    // //화면공유 테스트 여기부터
    // navigator.mediaDevices
    //   .getDisplayMedia({
    //     video: true,
    //     audio: true,
    //   })
    //   .then((stream) => {
    //     console.log("getDisplayMedia", stream);
    //   })
    //   .catch((error) => {
    //     console.log(`getDisplayMedia error: ${error}`);
    //   });

    // //화면 공유 테스트 여기까지

    newSocket.on("userEnter", (data: { id: string }) => {
      createReceivePC(data.id, newSocket);
    });

    // 해당 방에 있는 유저들 목록을 받음
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
          console.log("여긴가", data.sdp);
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
        meetId,
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
        meetId,
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
    console.log("pc", pc);

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        console.log("sender PC onicecandidate");
        newSocket.emit("senderCandidate", {
          candidate: e.candidate,
          senderSocketID: newSocket.id,
        });
      }
    };

    pc.oniceconnectionstatechange = (e: any) => {
      console.log(
        "Sender oniceconnectionstatechange",
        e.target.iceConnectionState
      );
    };

    if (localStream) {
      console.log("localstream add", localStream.getTracks());
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
        console.log("receiver PC onicecandidate", e.candidate);
        newSocket.emit("receiverCandidate", {
          candidate: e.candidate,
          receiverSocketID: newSocket.id,
          senderSocketID: socketID,
        });
      }
    };

    pc.oniceconnectionstatechange = (e: any) => {
      console.log(
        "Receiver oniceconnectionstatechange",
        e.target.iceConnectionState
      );
    };

    pc.ontrack = (e) => {
      console.log("ontrack success", e);
      setUsers((oldUsers) => oldUsers.filter((user) => user.id !== socketID));
      e.streams[0].getTracks().forEach((track) => {
        console.log("stream 정보", track);
      });
      setUsers((oldUsers) =>
        oldUsers.concat({
          id: socketID,
          stream: e.streams[0],
          muted: false,
          videoOff: false,
        })
      );
    };

    // return pc
    return pc;
  };

  const onToggleMuted = () => {
    const nextValue = !muted;
    setMediaState((prev) => ({ ...prev, muted: nextValue }));

    // users.map((user) => {
    //   if (user.id === mySessionId) {
    //     user.muted = nextValue;
    //   }
    // });

    const audioTrack = users[0].stream.getAudioTracks()[0];
    if (!audioTrack) return;
    audioTrack.enabled = !nextValue;
  };

  const onToggleVideoDisabled = () => {
    const nextValue = !videoDisabled;
    setMediaState((prev) => ({ ...prev, videoDisabled: nextValue }));

    const videoTrack = users[0].stream.getVideoTracks()[0];
    if (!videoTrack) return;
    videoTrack.enabled = !nextValue;
  };

  // 통화 종료
  const onHangOff = () => {
    window.location.replace("/");
  };

  // 사이드바 토글
  const onToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // 화면 공유

  const onScreenShare = () => {
    navigator.mediaDevices
      .getDisplayMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        console.log("getDisplayMedia", stream);
        const myStream = {
          id: "1asdasd6789",
          stream,
          muted: false,
          videoOff: false,
        };

        setUsers((oldUsers) => [...oldUsers, myStream]);
        // eslint-disable-next-line

        // todo : 화면 공유 했을때 상대방도 보이게 설정 해줘야됌.
        // 아마 displayMedia 를 따로 사용하는법이 있을 거 같은데 낼 일어나서 해보자

        let ScreenSocket = newSocket;
        ScreenSocket.id = "1asdasd6789";

        sendPC = createSenderPeerConnection(ScreenSocket, stream);
        createSenderOffer(ScreenSocket);

        newSocket.emit("joinRoom", {
          id: "1asdasd6789",
          meetId,
        });
      })
      .catch((error) => {
        console.log(`getDisplayMedia error: ${error}`);
      });
  };

  if (!exist) return <MeetNotFound />;

  return (
    <MeetPageBlock>
      <Wrapper>
        <main>
          <MeetGrid users={users} sidebarOpen={sidebarOpen} />
        </main>
        <MeetSidebar
          visible={sidebarOpen}
          onToggleSidebar={onToggleSidebar}
          users={users}
          mySessionId={mySessionId}
        />
      </Wrapper>
      <MeetFooter
        muted={muted}
        onToggleMuted={onToggleMuted}
        videoDisabled={videoDisabled}
        onToggleVideoDisabled={onToggleVideoDisabled}
        onHangOff={onHangOff}
        users={users}
        onToggleSidebar={onToggleSidebar}
        onScreenShare={onScreenShare}
      />
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

export default MeetPage;
