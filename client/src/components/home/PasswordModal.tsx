import useInput from "hooks/common/useInput";
import { meetCheckPasswordAPI } from "lib/api/meet";
import { palette } from "lib/styles/palette";
import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

interface PasswordModalProps {
  meetId: string;
  setIsRoomPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const PasswordModal = ({ meetId, setIsRoomPassword }: PasswordModalProps) => {
  const [password, onChangePassword] = useInput("");
  const [error, setError] = useState(false);
  const history = useHistory();

  const onPasswordCheck = async () => {
    try {
      await meetCheckPasswordAPI(meetId, password);
      setIsRoomPassword(false);
    } catch (e) {
      setError(true);
    }
  };

  const onClose = () => {
    history.push("/");
  };

  return (
    <ModalBlock>
      <div className="modal-alert">
        <div className="modal-top"></div>
        <div className="modal-wrapper">
          <div className="wrapper-header">비밀번호를 입력해주세요</div>
          <InputBlock>
            <InputStyled
              type="password"
              value={password}
              onChange={onChangePassword}
              placeholder="비밀번호를 입력해주세요"
            />
            {error && <ErrorMessage>비밀번호가 일치하지 않습니다</ErrorMessage>}
          </InputBlock>
        </div>
        <div className="message-footer">
          <button className="message-btn" onClick={onPasswordCheck}>
            확인
          </button>
          <button type="button" className="message-btn last" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
      <div className="message-background"></div>
    </ModalBlock>
  );
};

const ModalBlock = styled.div`
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
    width: 435px;
    height: 250px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;

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

const InputBlock = styled.div`
  padding: 0 20px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const InputStyled = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid ${palette.border};
  padding: 10px;
  border-radius: 10px;
  outline: none;
  &:focus {
    border: 1px solid ${palette.mainColorHover};
  }
`;

const ErrorMessage = styled.div`
  margin-top: 10px;
  color: #b3130b;
  font-size: 14px;
  ::before {
    content: "\u2715";
    display: inline-block;
    padding-right: 3px;
    font-size: 14px;
    vertical-align: 0;
  }
`;

export default PasswordModal;
