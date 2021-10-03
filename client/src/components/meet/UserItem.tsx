import { MicOffIcon, MicIcon } from "assets/icons";
import React from "react";
import styled from "styled-components";

interface UserItemProps {
  userName: string;
  isMySelf: boolean;
  muted: boolean;
}

const UserItem = ({ userName, isMySelf, muted }: UserItemProps) => {
  return (
    <Item>
      <div>
        {userName}
        {isMySelf && <span className="me">(Me)</span>}
      </div>
      {muted ? <MicOffIcon /> : <MicIcon />}
    </Item>
  );
};

const Item = styled.div`
  height: 64px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #efefef;
  .me {
    margin-left: 4px;
    color: #343434;
  }
  svg {
    width: 24px;
    height: 24px;
    color: #595959;
  }
`;

export default UserItem;
