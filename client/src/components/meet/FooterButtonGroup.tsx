import {
  CallEndIcon,
  MicIcon,
  MicOffIcon,
  VideocamIcon,
  VideocamOffIcon,
  ScreenShareIcon,
  SettingIcon,
} from "assets/icons";
import useModal from "hooks/common/useModal";
import React from "react";
import styled from "styled-components";
import IconCircleButton from "./IconCircleButton";
import MeetSettingModal from "./MeetSettingModal";

interface FooterButtonGroupProps {
  muted: boolean;
  onToggleMuted: () => void;
  videoDisabled: boolean;
  onToggleVideoDisabled: () => void;
  onHangOff: () => void;
  onScreenShare: () => void;
  onChangeVideo: (videoId: string) => void;
  onChangeAudio: (audioId: string) => void;
}

const FooterButtonGroup = ({
  muted,
  onToggleMuted,
  videoDisabled,
  onToggleVideoDisabled,
  onHangOff,
  onScreenShare,
  onChangeVideo,
  onChangeAudio,
}: FooterButtonGroupProps) => {
  const { isModal, onToggleModal } = useModal();

  return (
    <>
      <Group>
        {muted ? (
          <RedButton onClick={onToggleMuted}>
            <MicOffIcon />
          </RedButton>
        ) : (
          <IconCircleButton onClick={onToggleMuted}>
            <MicIcon />
          </IconCircleButton>
        )}
        {videoDisabled ? (
          <RedButton onClick={onToggleVideoDisabled}>
            <VideocamOffIcon />
          </RedButton>
        ) : (
          <IconCircleButton onClick={onToggleVideoDisabled}>
            <VideocamIcon />
          </IconCircleButton>
        )}
        <IconCircleButton onClick={onScreenShare}>
          <ScreenShareIcon />
        </IconCircleButton>

        <IconCircleButton onClick={onToggleModal}>
          <SettingIcon />
        </IconCircleButton>

        <CallEndButton onClick={onHangOff}>
          <CallEndIcon />
        </CallEndButton>
      </Group>

      {isModal && (
        <MeetSettingModal
          isModal={isModal}
          onToggleModal={onToggleModal}
          onChangeVideo={onChangeVideo}
          onChangeAudio={onChangeAudio}
        />
      )}
    </>
  );
};

const Group = styled.div`
  display: flex;
`;

const RedButton = styled(IconCircleButton)`
  background: #d32f2f;
  &:hover {
    background: #f44336;
  }
`;

const CallEndButton = styled(RedButton)`
  width: 64px;
`;

export default FooterButtonGroup;
