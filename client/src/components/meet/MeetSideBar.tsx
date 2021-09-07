import React from "react";
import { CloseIcon } from "assets/icons";
import styled, { css } from "styled-components";

interface SidebarProps {
  visible: boolean;
}

const Sidebar = ({ visible }: SidebarProps) => {
  return (
    <Aside visible={visible}>
      <div className="content">
        <header>
          <h3>Users</h3>
          <button>
            <CloseIcon />
          </button>
        </header>
        <div className="users">
          <div className="scroll">
            {/* {sessions.map((s) => (
              <UserItem
                key={s.id}
                displayName={s.user.displayName}
                isMySelf={s.id === mySessionId}
                muted={s.state.muted}
              />
            ))} */}
          </div>
        </div>
      </div>
    </Aside>
  );
};

const Aside = styled.aside<{ visible: boolean }>`
  display: flex;
  background: #212121;
  width: 320px;
  flex-direction: column;
  ${(props) =>
    props.visible
      ? css`
          width: 320px;
          opacity: 1;
        `
      : css`
          width: 0px;
          opacity: 0;
        `}
  .content {
    border: 8px solid #212121;
    border-left-width: 4px;
    background: white;
    flex: 1;
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

export default Sidebar;
