import React, { useEffect, useRef, useState } from "react";
import { CloseIcon } from "assets/icons";
import styled, { css } from "styled-components";
import { RiSendPlaneFill } from "react-icons/ri";
import { palette } from "lib/styles/palette";
import { IChat } from "./Meet";
import { IUserState } from "atoms/userState";

interface ChatsSideBarProps {
  visible: boolean;
  onToggleSidebar: () => void;
  meetId: string;
  user: IUserState;
  newSocket: SocketIOClient.Socket;
}

const ChatsSideBar = ({
  visible,
  onToggleSidebar,
  meetId,
  user,
  newSocket,
}: ChatsSideBarProps) => {
  const [chatMessages, setChatMessages] = useState<IChat[]>([]);
  const [message, setMessage] = useState("");
  const [receiveMessage, setReceiveMessage] = useState({
    meetId: "",
    message: "",
    name: "",
  });

  const onChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const onSendChatMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const messageObject = {
      meetId,
      message,
      name: user.name,
    };

    newSocket.emit("sendChatMessage", messageObject);
    setMessage("");
  };

  // 채팅 스크롤 고정
  const messagesEndRef = useRef<any>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    newSocket.on("receiveChatMessage", (messageObject: IChat) => {
      console.log("get Chat Effect Rendering");
      setReceiveMessage(messageObject);
    });
  }, []);

  useEffect(() => {
    console.log("set Chat Effect Rendering");
    const setChat = async () => {
      (await receiveMessage.name.length) > 0 &&
        setChatMessages((chat) => chat.concat(receiveMessage));
      scrollToBottom();
    };
    setChat();
  }, [receiveMessage]);

  return (
    <Aside visible={visible}>
      <div className="content">
        <header>
          <h3>채팅</h3>
          <button onClick={onToggleSidebar}>
            <CloseIcon />
          </button>
        </header>
        <div className="chats">
          <div className="scroll">
            {chatMessages.map((chat, index) => (
              <div key={index}>{chat.message}</div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>
        </div>

        <MessageInput>
          <form onSubmit={onSendChatMessage}>
            <input
              type="text"
              value={message}
              onChange={onChangeMessage}
              placeholder="메세지를 입력해주세요"
            />
            <button type="submit">
              <RiSendPlaneFill size="28" />
            </button>
          </form>
        </MessageInput>
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
        font-size: 20px;
        margin: 0;
      }
    }
    .chats {
      flex: 1;
      position: relative;

      .scroll {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: auto;
        padding: 10px 15px;
        .item {
          width: 100%;
          height: 56px;
          border: 1px solid white;
        }
      }
    }
  }
`;

const MessageInput = styled.div`
  padding: 15px 20px;
  form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    input {
      width: 90%;
      border: 1px solid #f1f3f4;
      background: #f1f3f4;
      border-radius: 15px;
      padding: 8px;
      outline: none;
    }
    svg {
      color: ${palette.mainColor};
    }
  }
`;

export default ChatsSideBar;
