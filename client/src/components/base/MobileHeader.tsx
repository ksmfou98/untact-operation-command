import React from "react";
import media from "lib/styles/media";
import styled from "styled-components";
import { palette } from "lib/styles/palette";
import { AiOutlineMenu } from "react-icons/ai";
import MobileSideBar from "./MobileSidebar";
import { useRecoilState } from "recoil";
import { sideBarState } from "atoms/sideBarState";

const MobileHeader = () => {
  const [isSideBar, setIsSideBar] = useRecoilState(sideBarState);

  const onToggleSideBar = () => {
    setIsSideBar(!isSideBar);
  };

  return (
    <MobileHeaderBlock>
      <MobileHeaderInner>
        <Title>U O C</Title>
        <MenuButton onClick={onToggleSideBar}>
          <AiOutlineMenu size="28" />
        </MenuButton>
      </MobileHeaderInner>

      <MobileSideBar isSideBar={isSideBar} onToggleSideBar={onToggleSideBar} />
    </MobileHeaderBlock>
  );
};

const MobileHeaderBlock = styled.header`
  display: none;
  position: relative;
  ${media.small} {
    display: block;
  }
`;

const MobileHeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background-color: ${palette.mainColor};
  color: #fff;
  position: fixed;
  z-index: 10;
  top: 0;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
`;

const MenuButton = styled.button`
  position: absolute;
  right: 12px;
  svg {
    color: #fff;
  }
`;

export default MobileHeader;
