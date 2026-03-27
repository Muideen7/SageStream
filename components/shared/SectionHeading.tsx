"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  className?: string;
}

export const SectionHeading = ({ title, className }: SectionHeadingProps) => {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-2xl font-black uppercase tracking-tight text-[--cream] md:text-3xl"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "40px" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="h-1 bg-[--orange]"
      />
    </div>
  );
};
