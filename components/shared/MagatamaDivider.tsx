"use client";

import React from "react";
import { motion } from "framer-motion";

export const MagatamaDivider = () => {
  return (
    <div className="relative flex w-full items-center justify-center py-16 opacity-50">
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[--border] to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.4,
              delay: i * 0.05,
              ease: [0.175, 0.885, 0.32, 1.275],
            }}
            className="magatama h-[8px] w-[8px]"
          />
        ))}
      </div>
    </div>
  );
};
