import Button from "components/common/Button";
import { palette } from "lib/styles/palette";
import React from "react";
import styled from "styled-components";

const EndMeetModal = () => {
  const goHome = () => {
    window.location.replace("/");
  };
  return (
    <EndMeetModalBlock>
      <ModalWrapper>
        <ModalTop />
        <ModalMain>
          <MainHeader>알림</MainHeader>
          <MainContent>호스트가 회의를 종료하였습니다.</MainContent>
        </ModalMain>
        <ModalFooter>
          <StyledButton color="true" onClick={goHome}>
            확인
          </StyledButton>
        </ModalFooter>
      </ModalWrapper>
      <ModalBackground />
    </EndMeetModalBlock>
  );
};

const EndMeetModalBlock = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9999;
`;

const ModalWrapper = styled.div`
  position: absolute;
  z-index: 9999;
  background-color: #fff;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  width: 380px;
  height: 220px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
`;

const ModalTop = styled.div`
  width: 100%;
  height: 10px;
  background: ${palette.mainColor};
  border-radius: 10px 10px 0 0;
`;

const ModalMain = styled.div`
  position: relative;
  margin: 25px;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
`;

const MainHeader = styled.div`
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.025em;
  color: ${palette.mainColor};
  padding-bottom: 20px;
`;

const MainContent = styled.div`
  padding: 28px;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
`;

const ModalFooter = styled.div`
  text-align: center;
  background-color: #f5f5f5;
  padding: 15px 0;
`;

const StyledButton = styled(Button)`
  width: 80px;
  height: 30px;
`;

const ModalBackground = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  background-color: #000;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0.8;
`;

export default EndMeetModal;
