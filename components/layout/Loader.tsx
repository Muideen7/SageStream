"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame } from "lucide-react";
import gsap from "gsap";

interface LoaderProps {
  onComplete: () => void;
}

export const Loader = ({ onComplete }: LoaderProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          setLoading(false);
          onComplete();
        }, 600);
      },
    });

    // Simulate progress
    tl.to(".loader-progress-fill", {
      width: "100%",
      duration: 1.5,
      ease: "power2.inOut",
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.95, 0.05, 0.795, 0.035] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[--bg-base]"
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="flex flex-col items-center gap-4">
              <Flame size={36} className="text-[--orange]" />
              <h1 className="text-2xl font-black uppercase tracking-[0.15em] text-[--cream]">
                SageStream
              </h1>
            </div>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.5 + i * 0.08,
                    ease: [0.175, 0.885, 0.32, 1.275],
                  }}
                  className="magatama"
                />
              ))}
            </div>

            <div className="mt-4 flex flex-col items-center gap-2">
              <div className="h-[2px] w-40 overflow-hidden rounded-full bg-[--bg-raised]">
                <div className="loader-progress-fill h-full w-0 bg-[--orange]" />
              </div>
              <span className="text-[10px] font-medium uppercase tracking-widest text-[--cream-muted]">
                Loading your next arc
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
