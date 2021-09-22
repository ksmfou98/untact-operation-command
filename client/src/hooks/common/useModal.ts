import { useState } from "react";

export default function useModal() {
  const [isModal, setIsModal] = useState(true);

  const onToggleModal = () => {
    setIsModal(!isModal);
  };

  return {
    isModal,
    onToggleModal,
  };
}
