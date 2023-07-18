import { type PropsWithChildren } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  className: string;
};

function SlideInUpAnimation({ className, children }: PropsWithChildren<Props>) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default SlideInUpAnimation;
