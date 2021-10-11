import React from "react";
import media from "lib/styles/media";
import styled from "styled-components";
import { palette } from "lib/styles/palette";
import { AiOutlineMenu } from "react-icons/ai";

const MobileHeader = () => {
  return (
    <MobileHeaderBlock>
      <MobileHeaderInner>
        <Title>U O C</Title>
        <MenuButton>
          <AiOutlineMenu size="28" />
        </MenuButton>
      </MobileHeaderInner>
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
