import Modal from "components/common/Modal";
import React from "react";

interface PasswordModalProps {
  isModal: boolean;
  onToggleModal: () => void;
}

const PasswordModal = ({ isModal, onToggleModal }: PasswordModalProps) => {
  return (
    <Modal
      buttonName="입장"
      onClick={() => console.log("테스트")}
      isModal={isModal}
      onToggleModal={onToggleModal}
      size="small"
      title="비밀번호를 입력해주세요"
    >
      <input type="password" placeholder="비밀번호를 입력해주세요" />
    </Modal>
  );
};

export default PasswordModal;
