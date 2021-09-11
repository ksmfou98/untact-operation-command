import React from "react";
import styled from "styled-components";
import FooterButtonGroup from "./FooterButtonGroup";
import UsersButton from "./UsersButton";

interface MeetFooterProps {
  muted: boolean;
  onToggleMuted: () => void;
  videoDisabled: boolean;
  onToggleVideoDisabled: () => void;
  onHangOff: () => void;
  users: IWebRTCUser[];
  onToggleSidebar: () => void;
  onScreenShare: () => void;
}

const MeetFooter = ({
  muted,
  onToggleMuted,
  videoDisabled,
  onToggleVideoDisabled,
  onHangOff,
  users,
  onToggleSidebar,
  onScreenShare,
}: MeetFooterProps) => {
  return (
    <MeetFooterBlock>
      <div className="left">
        <div className="meetId">방 제목 적는 곳</div>
      </div>
      <div className="center">
        <FooterButtonGroup
          muted={muted}
          onToggleMuted={onToggleMuted}
          videoDisabled={videoDisabled}
          onToggleVideoDisabled={onToggleVideoDisabled}
          onHangOff={onHangOff}
          onScreenShare={onScreenShare}
        />
      </div>
      <div className="right">
        <UsersButton usersCount={users.length} onClick={onToggleSidebar} />
      </div>
    </MeetFooterBlock>
  );
};

const MeetFooterBlock = styled.footer`
  display: flex;
  align-items: center;
  height: 80px;
  padding-left: 24px;
  padding-right: 24px;
  .left,
  .right {
    width: 240px;
    display: flex;
  }
  .right {
    justify-content: flex-end;
  }
  .center {
    display: flex;
    justify-content: center;
    flex: 1;
  }
  .meetId {
    font-family: monospace;
    color: white;
    font-size: 21px;
    font-weight: bold;
  }
`;

export default MeetFooter;
