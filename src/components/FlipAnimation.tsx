// components/FlipAnimation.tsx
import { motion } from "framer-motion";
import React from "react";

const flipVariants = {
  initial: { opacity: 0, rotateX: -180 },
  animate: { opacity: 1, rotateX: 0 },
  exit: { opacity: 0, rotateX: 180 },
};

const FlipAnimation: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <motion.div
      variants={flipVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};

export default FlipAnimation;
