import {
  CallEndIcon,
  MicIcon,
  MicOffIcon,
  VideocamIcon,
  VideocamOffIcon,
  ScreenShareIcon,
} from "assets/icons";
import React from "react";
import styled from "styled-components";
import IconCircleButton from "./IconCircleButton";

interface FooterButtonGroupProps {
  muted: boolean;
  onToggleMuted: () => void;
  videoDisabled: boolean;
  onToggleVideoDisabled: () => void;
  onHangOff: () => void;
  onScreenShare: () => void;
}

const FooterButtonGroup = ({
  muted,
  onToggleMuted,
  videoDisabled,
  onToggleVideoDisabled,
  onHangOff,
  onScreenShare,
}: FooterButtonGroupProps) => {
  return (
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

      <CallEndButton onClick={onHangOff}>
        <CallEndIcon />
      </CallEndButton>
    </Group>
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
