'use client'

import React from "react";
import { motion } from "framer-motion";

const MotionWrapper = ({
  children,
  motionKey,
}: {
  motionKey: number;
  children: React.ReactNode;
}) => {
  const paginationVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };
  return (
    <motion.div
      key={motionKey}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={paginationVariants}
      className="max-w-full"
    >
      {children}
    </motion.div>
  );
};

export default MotionWrapper;
