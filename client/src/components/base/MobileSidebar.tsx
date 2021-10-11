import React from "react";
import styled, { css } from "styled-components";

interface MobileSideBarProps {
  isSideBar: boolean;
  onToggleSideBar: () => void;
}

const MobileSideBar = ({ isSideBar, onToggleSideBar }: MobileSideBarProps) => {
  return (
    <MobileSideBarBlock isSideBar={isSideBar} onMouseDown={onToggleSideBar}>
      <MobileSideBarInner
        isSideBar={isSideBar}
        onMouseDown={(e) => e.stopPropagation()}
      ></MobileSideBarInner>
      {isSideBar && <Background />}
    </MobileSideBarBlock>
  );
};

const MobileSideBarBlock = styled.div<{ isSideBar: boolean }>`
  position: fixed;
  ${(props) =>
    props.isSideBar
      ? css`
          width: 100%;
        `
      : css`
          width: 0%;
        `}
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9999;
`;

const MobileSideBarInner = styled.div<{ isSideBar: boolean }>`
  position: absolute;
  z-index: 9999;
  background-color: #fff;
  top: 0;
  bottom: 0;
  right: 0;
  ${(props) =>
    props.isSideBar
      ? css`
          width: 60%;
        `
      : css`
          width: 0%;
        `}
  transition: 0.5s;
`;

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #000;
  z-index: 9998;
  left: 0;
  top: 0;
  opacity: 0.5;
`;

export default MobileSideBar;
