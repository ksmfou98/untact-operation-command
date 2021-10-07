import Modal from "components/common/Modal";
import useInput from "hooks/common/useInput";
import { meetCheckPasswordAPI } from "lib/api/meet";
import { palette } from "lib/styles/palette";
import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

interface PasswordModalProps {
  isModal: boolean;
  onToggleModal: () => void;
  meetId: string;
}

const PasswordModal = ({
  isModal,
  onToggleModal,
  meetId,
}: PasswordModalProps) => {
  const [password, onChangePassword] = useInput("");
  const [error, setError] = useState(false);
  const history = useHistory();

  const onPasswordCheck = async () => {
    try {
      await meetCheckPasswordAPI(meetId, password);
      history.push(`/meet/${meetId}`);
    } catch (e) {
      setError(true);
    }
  };

  return (
    <PasswordModalBlock
      buttonName="입장"
      onClick={onPasswordCheck}
      isModal={isModal}
      onToggleModal={onToggleModal}
      size="small"
      title="비밀번호를 입력해주세요"
      isClose={false}
    >
      <InputBlock>
        <InputStyled
          type="password"
          value={password}
          onChange={onChangePassword}
          placeholder="비밀번호를 입력해주세요"
        />
        {error && <ErrorMessage>비밀번호가 일치하지 않습니다</ErrorMessage>}
      </InputBlock>
    </PasswordModalBlock>
  );
};

const PasswordModalBlock = styled(Modal)``;

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
