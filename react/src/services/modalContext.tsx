import { createContext, useState, useContext, ReactNode } from "react";
import Modal from "../components/ConfirmationModal";

interface ModalContextType {
  isOpen: boolean;
  title: string;
  subTitle: string;
  showModal: (title: string, subTitle: string, onConfirm?: () => void) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [onConfirm, setOnConfirm] = useState<(() => void) | undefined>();

  const showModal = (title: string, subTitle: string, onConfirm?: () => void) => {
    setTitle(title);
    setSubTitle(subTitle);
    setOnConfirm(() => onConfirm);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTitle("");
    setSubTitle("");
    setOnConfirm(undefined);
  };

  return (
    <ModalContext.Provider value={{ isOpen, title, subTitle, showModal, closeModal }}>
      {children}
      <Modal isOpen={isOpen} title={title} subTitle={subTitle} onClose={closeModal} onConfirm={onConfirm} />
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
