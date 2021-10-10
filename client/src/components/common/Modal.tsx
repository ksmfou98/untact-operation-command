import { palette } from "lib/styles/palette";
import transitions from "lib/styles/transitions";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import styled, { css } from "styled-components";

interface ModalProps {
  title: string;
  buttonName: string;
  onToggleModal: () => void;
  children: React.ReactNode;
  size: "small" | "middle" | "big";
  isModal: boolean;
  onClick?: () => void;
  isClose?: boolean;
}

const Modal = ({
  title,
  onToggleModal,
  children,
  buttonName,
  size,
  isModal,
  onClick,
  isClose = true,
}: ModalProps) => {
  return (
    <ModalBlock size={size} isModal={isModal} onMouseDown={onToggleModal}>
      <div className="modal-alert" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-top"></div>

        <div className="modal-wrapper">
          <div className="wrapper-header">{title} </div>
          {children}
          <button
            type="button"
            onClick={onToggleModal}
            className="wrapper-button"
          >
            <AiOutlineClose size="30" />
          </button>
        </div>
        <div className="message-footer">
          {onClick && (
            <button
              className="message-btn"
              onClick={() => {
                onClick();
                if (isClose) {
                  onToggleModal();
                }
              }}
            >
              {buttonName}
            </button>
          )}
          <button
            type="button"
            onClick={onToggleModal}
            className="message-btn last"
          >
            닫기
          </button>
        </div>
      </div>
      <div className="message-background"></div>
    </ModalBlock>
  );
};

const ModalBlock = styled.div<{ size: string; isModal: boolean }>`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9999;
  .modal-alert {
    position: absolute;
    z-index: 9999;
    background-color: #fff;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    width: ${(props) => {
      switch (props.size) {
        case "small":
          return "435px";
        case "middle":
          return "700px";
        case "big":
          return "550px";
      }
    }};
    height: ${(props) => {
      switch (props.size) {
        case "small":
          return "250px";
        case "middle":
          return "500px";
        case "big":
          return "640px";
      }
    }};
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    ${(props) =>
      props.isModal &&
      css`
        animation: ${transitions.popInFromBottom} 0.4s forwards ease-in-out;
      `}
    .modal-top {
      width: 100%;
      height: 10px;
      background: ${palette.mainColor};
      border-radius: 10px 10px 0 0;
    }
    .modal-wrapper {
      position: relative;
      margin: 25px;
      height: 100%;
      display: flex;
      flex-direction: column;
      margin-bottom: 0;
      .wrapper-header {
        font-size: 18px;
        font-weight: 600;
        letter-spacing: -0.025em;
        color: ${palette.mainColor};
        padding-bottom: 20px;
        border-bottom: 1px solid #b2b2b2;
      }
      .wrapper-button {
        position: absolute;
        right: 0;
        top: -7px;
        color: #999;
      }
    }
    .message-footer {
      text-align: center;
      background-color: #f5f5f5;
      padding: 20px 0;
      .message-btn {
        font-size: 15px;
        width: 100px;
        height: 35px;
        font-weight: 600;
        line-height: 34px;
        display: inline-block;
        border: 1px solid ${palette.mainColor};
        border-radius: 20px;
        text-align: center;
        background-color: ${palette.mainColor};
        color: #fff;
        margin-right: 10px;
      }
      .last {
        background-color: #fff;
        color: ${palette.mainColor};
      }
    }
  }
  .message-background {
    display: block;
    width: 100%;
    height: 100%;
    background-color: #000;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0.5;
  }
`;

export default Modal;
