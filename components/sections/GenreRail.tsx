"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { GENRES } from "@/lib/anime-data";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

export const GenreRail = () => {
  const [activeGenre, setActiveGenre] = useState("Action");

  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 lg:px-12 py-12">
      <div className="mb-8 flex flex-col gap-2">
        <h2 className="text-xl font-black uppercase tracking-tight text-[--cream] md:text-2xl">
          Find Your Next Arc
        </h2>
        <div className="h-1 w-10 bg-[--orange]" />
      </div>

      <div className="no-scrollbar flex gap-4 overflow-x-auto pb-6 scroll-smooth">
        {GENRES.map((genre, idx) => {
          const Icon = (LucideIcons as any)[genre.icon];
          const isActive = activeGenre === genre.label;

          return (
            <motion.button
              key={genre.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.04, duration: 0.4 }}
              onClick={() => setActiveGenre(genre.label)}
              className={cn(
                "group flex h-11 items-center gap-3 shrink-0 rounded-full border px-6 text-sm font-semibold transition-all",
                isActive
                  ? "bg-[--orange] border-[--orange] text-[--bg-base]"
                  : "bg-[--bg-raised] border-[--border] text-[--cream-muted] hover:border-[--border-hover] hover:text-[--orange]"
              )}
            >
              {Icon && <Icon size={18} className={cn(isActive ? "text-[--bg-base]" : "text-[--orange]")} />}
              <span>{genre.label}</span>
              
              {isActive && (
                <motion.div
                  layoutId="genre-active-pill"
                  className="absolute inset-0 z-[-1] rounded-full bg-[--orange]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </section>
  );
};
