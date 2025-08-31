import { useState } from "react";

type UseDisclosureReturn = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setIsOpenAction: (isOpen: boolean) => void;
};

export default function useDisclosure(initialState: boolean = false): UseDisclosureReturn {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const setIsOpenAction = (isOpen: boolean) => setIsOpen(isOpen);

  return {
    isOpen,
    onOpen,
    onClose,
    setIsOpenAction,
  };
}
