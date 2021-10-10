import React, { useEffect, useRef, useState } from "react";
import { CloseIcon } from "assets/icons";
import styled, { css } from "styled-components";
import { RiSendPlaneFill } from "react-icons/ri";
import { palette } from "lib/styles/palette";
import { IUserState } from "atoms/userState";

interface ChatsSideBarProps {
  visible: boolean;
  onToggleSidebar: () => void;
  meetId: string;
  user: IUserState;
  newSocket: SocketIOClient.Socket;
}

interface IChat {
  meetId: string;
  message: string;
  name: string;
  userId: string;
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
    userId: "",
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
      userId: user._id,
    };

    if (messageObject.message.length <= 0) return;

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
  }, [newSocket]);

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
              <ChatStyled key={index}>
                <div className={user._id === chat.userId ? "right" : "left"}>
                  <div className="talk">
                    <div className="name">
                      {user._id === chat.userId ? "나" : chat.name}
                    </div>

                    <div className="message">
                      <div className="txt">{chat.message}</div>
                    </div>
                  </div>
                </div>
              </ChatStyled>
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

const ChatStyled = styled.div`
  overflow: hidden;
  padding: 8px 0;
  .talk {
    position: relative;
    padding-top: 23px;
    .name {
      position: absolute;
      top: 2px;
      left: 0;
      font-size: 14px;
      line-height: 13px;
      vertical-align: top;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .message {
      overflow: hidden;
      display: inline-block;
      background-color: #f5f3f3;
      position: relative;
      z-index: 0;
      max-width: 100%;
      font-size: 14px;
      line-height: 1.33;
      word-break: break-word;
      word-wrap: break-word;
      vertical-align: bottom;
      .txt {
        margin: 10px 12px 9px;
        white-space: pre-wrap;
      }
    }
  }

  .left {
    float: left;
    position: relative;
    max-width: 60%;
    .talk {
      box-sizing: border-box;
      padding-top: 23px;
      margin-left: 7px;
      .message {
        border-radius: 3px 16px 16px;
      }
    }
  }
  .right {
    float: right;
    .talk {
      float: right;
      margin: 0;
      text-align: right;
      .message {
        border-radius: 16px 16px 3px;
        text-align: left;
      }
    }
  }
`;

export default ChatsSideBar;
