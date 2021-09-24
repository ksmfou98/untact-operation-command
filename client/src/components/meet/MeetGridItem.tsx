import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface Props {
  stream: MediaStream;
  muted: boolean;
  width: number;
}

const MeetGridItem = ({ stream, muted, width }: Props) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  useEffect(() => {
    if (ref.current) ref.current.srcObject = stream;
    console.log("랄라", stream.getTracks());
    // stream.getTracks().forEach((track) => {
    //   track.enabled = false;
    // });
    if (muted) setIsMuted(muted);
  }, [muted, stream]);

  return (
    <MeetGridItemBlock style={{ width }}>
      <VideoContainer ref={ref} playsInline muted={isMuted} autoPlay />
    </MeetGridItemBlock>
  );
};

const MeetGridItemBlock = styled.div`
  border: 8px solid #212121;
  position: relative;
`;

const VideoContainer = styled.video`
  object-fit: cover; // video 태그 무조건 1:1 비율인걸 깨뜨려주는 얘임
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

export default MeetGridItem;
