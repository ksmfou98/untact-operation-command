import Modal from "components/common/Modal";
import React from "react";

interface MemberSearchModalProps {
  onToggleModal: () => void;
  isModal: boolean;
}

const MemberSearchModal = ({
  isModal,
  onToggleModal,
}: MemberSearchModalProps) => {
  console.log(isModal);
  return (
    <div>
      <Modal
        title="친구 추가"
        buttonName="추가"
        onClick={() => {
          console.log("생성");
        }}
        onToggleModal={onToggleModal}
        isModal={isModal}
        size="big"
      >
        <div>asd</div>
      </Modal>
    </div>
  );
};

export default MemberSearchModal;
