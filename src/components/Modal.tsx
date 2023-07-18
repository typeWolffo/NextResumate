import { useManagedUIContext } from "@/contexts/ManagedUiContext";
import { motion } from "framer-motion";
import React, { useRef, type PropsWithChildren } from "react";
import { createPortal } from "react-dom";

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, backdropFilter: "blur(0px)" },
  visible: { opacity: 1, scale: 1, backdropFilter: "blur(5px)" },
  exit: { opacity: 0, scale: 0.9, backdropFilter: "blur(0px)" },
};

type ModalProps = PropsWithChildren & {
  id: string;
};

function Modal({ id, children }: ModalProps) {
  const { modals, closeModal } = useManagedUIContext();
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (modalRef.current === e.target) {
      closeModal(id);
    }
  };

  if (!modals[id]) {
    return null;
  }

  return createPortal(
    <motion.div
      className="absolute inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/20"
      onClick={handleClose}
      ref={modalRef}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={modalVariants}
    >
      {children}
    </motion.div>,
    document.body
  );
}

export default Modal;
