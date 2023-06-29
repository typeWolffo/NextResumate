import { useManagedUIContext } from "@/contexts/ManagedUiContext";
import { motion } from "framer-motion";
import React, { useRef, type PropsWithChildren } from "react";
import { createPortal } from "react-dom";

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, backdropFilter: "blur(0px)" },
  visible: { opacity: 1, scale: 1, backdropFilter: "blur(5px)" },
  exit: { opacity: 0, scale: 0.9, backdropFilter: "blur(0px)" },
};

function Modal({ children }: PropsWithChildren) {
  const { setIsModalOpen } = useManagedUIContext();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (modalRef.current === e.target) {
      setIsModalOpen(false);
    }
  };

  return createPortal(
    <motion.div
      className="absolute inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/20"
      onClick={closeModal}
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
