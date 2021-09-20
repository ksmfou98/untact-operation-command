import Modal from "components/common/Modal";
import React from "react";

interface MeetCreateModalProps {
  onToggleModal: () => void;
  isModal: boolean;
}

const MeetCreateModal = ({ isModal, onToggleModal }: MeetCreateModalProps) => {
  return (
    <Modal
      title="회의 생성"
      buttonName="생성"
      onClick={() => console.log("나중에 생성 api나오면 그떄 ㄱ")}
      onToggleModal={onToggleModal}
      isModal={isModal}
      size="big"
    >
      asd
    </Modal>
  );
};

export default MeetCreateModal;
