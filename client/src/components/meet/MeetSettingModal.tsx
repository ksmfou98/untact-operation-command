import Modal from "components/common/Modal";
import React, { useState } from "react";
import styled from "styled-components";
import MediaSetting from "./MediaSetting";
import RoomSetting from "./RoomSetting";

interface MeetSettingModalProps {
  isModal: boolean;
  onToggleModal: () => void;
}

const MeetSettingModal = ({
  isModal,
  onToggleModal,
}: MeetSettingModalProps) => {
  const [menu, setMenu] = useState("media");

  const onSetMenuMedia = () => {
    setMenu("media");
  };

  const onSetMenuRoom = () => {
    setMenu("room");
  };

  return (
    <MeetSettingModalBlock
      buttonName="확인"
      size="middle"
      title="설정"
      isModal={isModal}
      onToggleModal={onToggleModal}
    >
      <ContentBox>
        <LeftNav>
          <ul>
            <li onClick={onSetMenuMedia}>음성 및 비디오</li>
            <li onClick={onSetMenuRoom}>방 설정</li>
          </ul>
        </LeftNav>
        <RightContent>
          {menu === "media" && <MediaSetting />}
          {menu === "room" && <RoomSetting />}
        </RightContent>
      </ContentBox>
    </MeetSettingModalBlock>
  );
};

const MeetSettingModalBlock = styled(Modal)``;

const ContentBox = styled.div`
  display: flex;
  height: 100%;
`;

const LeftNav = styled.div`
  background-color: blue;
  height: 100%;
  width: 160px;
`;

const RightContent = styled.div`
  background-color: yellow;
  flex: 1;
`;

export default MeetSettingModal;
