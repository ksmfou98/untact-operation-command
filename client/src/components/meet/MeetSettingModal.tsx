import Modal from "components/common/Modal";
import { palette } from "lib/styles/palette";
import React, { useState } from "react";
import styled from "styled-components";
import MediaSetting from "./MediaSetting";
import RoomSetting from "./RoomSetting";

interface MeetSettingModalProps {
  isModal: boolean;
  onToggleModal: () => void;
  onChangeVideo: (videoId: string) => void;
  onChangeAudio: (audioId: string) => void;
}

const MeetSettingModal = ({
  isModal,
  onToggleModal,
  onChangeVideo,
  onChangeAudio,
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
        <LeftMenu>
          <MenuList>
            <MenuItem onClick={onSetMenuMedia}>
              <span className={menu === "media" ? "active" : ""}>
                음성 및 비디오
              </span>
            </MenuItem>
            <MenuItem onClick={onSetMenuRoom}>
              <span className={menu === "room" ? "active" : ""}>방 설정</span>
            </MenuItem>
          </MenuList>
        </LeftMenu>
        <RightContent>
          {menu === "media" && (
            <MediaSetting
              onChangeVideo={onChangeVideo}
              onChangeAudio={onChangeAudio}
            />
          )}
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

const LeftMenu = styled.div`
  height: 100%;
  width: 160px;
  border-right: 1px solid #dadce0;
`;

const MenuList = styled.ul``;

const MenuItem = styled.li`
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 3px;
  span {
    color: #484747;
    display: block;
    padding: 15px 20px;
    border-radius: 10px;
    &:hover {
      background-color: #f1efef;
      font-weight: 500;
      color: ${palette.mainColor};
    }
  }
  .active {
    background-color: #f1efef;
    font-weight: 500;
    color: ${palette.mainColor};
  }
`;

const RightContent = styled.div`
  flex: 1;
  padding: 10px;
`;

export default MeetSettingModal;
