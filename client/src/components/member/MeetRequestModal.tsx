import React from "react";
import Modal from "components/common/Modal";
import styled from "styled-components";
import { palette } from "lib/styles/palette";
import useHandleMeet from "hooks/meet/useHandleMeet";

interface MeetRequestModalProps {
  isModal: boolean;
  onToggleModal: () => void;
  name: string;
}

const MeetRequestModal = ({
  isModal,
  onToggleModal,
  name,
}: MeetRequestModalProps) => {
  const { onCreateMeet } = useHandleMeet();

  return (
    <Modal
      title="1:1 채팅 신청"
      buttonName="신청"
      onClick={onCreateMeet}
      isModal={isModal}
      onToggleModal={onToggleModal}
      size="small"
    >
      <MeetRequestModalBlock>
        <Title>{name}님에게 1:1 대화 신청을 하시겠습니까?</Title>
        <Form>
          <input type="password" placeholder="비밀번호" />
        </Form>
      </MeetRequestModalBlock>
    </Modal>
  );
};

const MeetRequestModalBlock = styled.div`
  padding: 20px;
`;

const Title = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    border: 1px solid ${palette.border};
    padding: 8px;
    border-radius: 8px;
  }
`;

export default MeetRequestModal;
