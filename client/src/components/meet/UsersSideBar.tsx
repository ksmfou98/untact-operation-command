import React from "react";
import { CloseIcon } from "assets/icons";
import styled, { css } from "styled-components";
import UserItem from "./UserItem";

interface UsersSidebarProps {
  visible: boolean;
  onToggleSidebar: () => void;
  users: IWebRTCUser[];
  mySessionId: string;
}

const UsersSidebar = ({
  visible,
  onToggleSidebar,
  users,
  mySessionId,
}: UsersSidebarProps) => {
  return (
    <Aside visible={visible}>
      <div className="content">
        <header>
          <h3>Users</h3>
          <button onClick={onToggleSidebar}>
            <CloseIcon />
          </button>
        </header>
        <div className="users">
          <div className="scroll">
            {users.map((user, index) => (
              <UserItem
                key={index}
                userName={user.name} // TODO: user.id 를 나중에 user.name 으로 변경
                isMySelf={user.id === mySessionId}
                muted={user.muted}
              />
            ))}
          </div>
        </div>
      </div>
    </Aside>
  );
};

const Aside = styled.aside<{ visible: boolean }>`
  display: flex;
  background: #212121;
  flex-direction: column;
  overflow: hidden;
  ${(props) =>
    props.visible
      ? css`
          width: 320px;
        `
      : css`
          width: 0px;
        `}

  transition: 0.5s;
  .content {
    border: 8px solid #212121;
    border-left-width: 4px;
    background: white;
    flex: 1;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    header {
      border-bottom: 1px solid #efefef;
      height: 64px;
      padding: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      button {
        border: none;
        outline: none;
        background: none;
        cursor: pointer;
        padding: 4px;
        display: flex;
        align-items: center;
      }
      h3 {
        font-size: 24px;
        margin: 0;
      }
    }
    .users {
      flex: 1;
      position: relative;
      .scroll {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: auto;
        .item {
          width: 100%;
          height: 56px;
          border: 1px solid white;
        }
      }
    }
  }
`;

export default UsersSidebar;
