import React from "react";
import styled from "styled-components";
import FooterButtonGroup from "./FooterButtonGroup";

interface MeetFooterProps {
  muted: boolean;
  onToggleMuted: () => void;
}

const MeetFooter = ({ muted, onToggleMuted }: MeetFooterProps) => {
  return (
    <MeetFooterBlock>
      <div className="left">
        <div className="meetId">방 제목 적는 곳</div>
      </div>
      <div className="center">
        <FooterButtonGroup muted={muted} onToggleMuted={onToggleMuted} />
      </div>
      <div className="right">
        {/* <UsersButton usersCount={sessions.length} onClick={onToggleSidebar} /> */}
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
