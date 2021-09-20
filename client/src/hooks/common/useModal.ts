import { useState } from "react";

export default function useModal() {
  const [isModal, setIsModal] = useState(false);

  const onToggleModal = () => {
    setIsModal(!isModal);
  };

  return {
    isModal,
    onToggleModal,
  };
}
