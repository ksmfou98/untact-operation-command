import React, { useEffect, useRef, useState } from "react";
import Styled from "styled-components";

const VideoContainer = Styled.video`
    background-color: black;
    object-fit: cover; // video 태그 무조건 1:1 비율인걸 깨뜨려주는 얘임
`;

interface Props {
  stream: MediaStream;
  muted?: boolean;
  width: number;
  height: number;
}

const MeetGridItem = ({ stream, muted, width, height }: Props) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    if (ref.current) ref.current.srcObject = stream;
    if (muted) setIsMuted(muted);
  });

  return (
    <VideoContainer
      ref={ref}
      muted={isMuted}
      width={width}
      height={height}
      autoPlay
    ></VideoContainer>
  );
};

export default MeetGridItem;
