import { useState } from "react";

export default function useCalendarModal() {
  const [isModal, setIsModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const onToggleModal = () => {
    setIsModal(!isModal);
  };
  const onEditToggleModal = () => {
    setIsEdit(!isEdit);
    setIsModal(!isModal);
  };
  return {
    isModal,
    onToggleModal,
    isEdit,
    onEditToggleModal,
  };
}
