import React, { useRef, useState } from "react";

const useFullscreen = () => {
  const element = useRef<any>();

  const [isFullScreen, setIsFullScreen] = useState(false);

  const onFullScreen = () => {
    isFullScreen ? exitFull() : triggerFull();
    setIsFullScreen(!isFullScreen);
  };

  const triggerFull = () => {
    if (element.current) {
      if (element.current.requestFullscreen) {
        element.current.requestFullscreen();
      }
    }
  };

  const exitFull = () => {
    document.exitFullscreen();
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };
  return { element, onFullScreen };
};

export default useFullscreen;
