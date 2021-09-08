import { CallEndIcon, MicOffIcon, VideocamOffIcon } from "assets/icons";
import React from "react";
import styled from "styled-components";
import IconCircleButton from "./IconCircleButton";

interface FooterButtonGroupProps {
  muted: boolean;
  onToggleMuted: () => void;
  videoDisabled: boolean;
  onToggleVideoDisabled: () => void;
}

const FooterButtonGroup = ({
  muted,
  onToggleMuted,
  videoDisabled,
  onToggleVideoDisabled,
}: FooterButtonGroupProps) => {
  return (
    <Group>
      <RedButton>
        <MicOffIcon onClick={onToggleMuted} />
      </RedButton>

      <RedButton>
        <VideocamOffIcon onClick={onToggleVideoDisabled} />
      </RedButton>

      <CallEndButton>
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
