"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";

const STATS = [
  { value: 10000, suffix: "+", label: "Anime Titles" },
  { value: 50, suffix: "M+", label: "Active Watchers" },
  { value: 4, suffix: "K", label: "Simulcast Partners" },
  { value: 99.9, suffix: "%", label: "Uptime" },
];

export const Stats = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      STATS.forEach((stat, idx) => {
        const valObj = { val: 0 };
        gsap.to(valObj, {
          val: stat.value,
          duration: 2,
          delay: idx * 0.15,
          ease: "power2.out",
          onUpdate: () => {
             const el = document.getElementById(`stat-value-${idx}`);
             if (el) el.innerText = Math.floor(valObj.val).toLocaleString();
          }
        });
      });
    }
  }, [isInView]);

  return (
    <section ref={containerRef} className="mx-auto w-full max-w-[1440px] px-6 lg:px-12 py-12 lg:py-24 border-y border-[--border]">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 divide-x border-[--border] lg:divide-[--border]">
        {STATS.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            className="flex flex-col items-center justify-center text-center lg:px-8"
          >
            <div className="flex items-baseline gap-1 text-4xl font-black md:text-5xl lg:text-6xl text-[--cream]">
              <span id={`stat-value-${idx}`}>0</span>
              <span className="text-[--orange]">{stat.suffix}</span>
            </div>
            <span className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-[--cream-muted]">
               {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
