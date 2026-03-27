"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Star, Calendar, MessageSquare, BookOpen } from "lucide-react";
import Image from "next/image";
import { AnimeCardProps } from "@/types";
import { Button } from "@/components/ui/button";

interface AnimeModalProps {
  anime: AnimeCardProps | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AnimeModal = ({ anime, isOpen, onClose }: AnimeModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!anime) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-12">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative flex flex-col w-full max-w-4xl max-h-[85vh] md:max-h-[90vh] overflow-hidden rounded-[2rem] border border-[--border] bg-[--bg-surface] shadow-[0_0_80px_rgba(0,0,0,0.8)]"
          >
            {/* Scrollable Area */}
            <div className="flex-1 overflow-y-auto no-scrollbar relative">
              {/* Header Banner */}
              <div className="relative aspect-video w-full md:aspect-[21/8]">
                <Image
                  src={anime.banner || anime.thumbnail}
                  alt={anime.title}
                  fill
                  className="object-cover opacity-40 md:opacity-60"
                />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[--bg-surface] to-transparent" />
                
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-[--cream] backdrop-blur-md transition-transform hover:scale-110 cursor-pointer border border-white/10"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content Body */}
              <div className="relative z-10 -mt-16 flex flex-col gap-6 p-6 md:p-10 md:flex-row md:items-start lg:gap-10">
                {/* Poster & Actions */}
                <div className="flex shrink-0 flex-row gap-4 items-end md:w-56 md:flex-col md:items-stretch">
                  <div className="relative aspect-[2/3] w-28 shrink-0 overflow-hidden rounded-2xl border border-[--border] shadow-2xl md:w-full">
                    <Image src={anime.thumbnail} alt={anime.title} fill className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col gap-3">
                    <Button className="h-10 md:h-12 w-full rounded-xl bg-[--orange] font-bold text-xs md:text-sm text-[--bg-base] hover:bg-[--orange] hover:brightness-110 chakra-glow cursor-pointer transition-all active:scale-95">
                      <Play size={16} fill="currentColor" className="mr-2" />
                      Watch Now
                    </Button>
                    {anime.status && (
                      <div className="flex h-8 md:h-10 items-center justify-center rounded-lg bg-[--gold]/10 border border-[--gold]/20 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-[--gold]">
                        {anime.status}
                      </div>
                    )}
                  </div>
                </div>

                {/* Text Info */}
                <div className="flex flex-1 flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[--gold]">
                      {anime.studio}
                    </div>
                    <h2 className="text-2xl font-black leading-tight tracking-tighter text-[--cream] md:text-5xl lg:text-6xl">
                      {anime.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-[--cream-muted]">
                      <div className="flex items-center gap-1.5 text-[--gold]">
                        <Star size={14} fill="currentColor" />
                        <span className="text-base font-black">{anime.rating}</span>
                      </div>
                      <span>·</span>
                      <span>{anime.episodes} EP</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Calendar size={12} /> {anime.releaseYear || '2024'}</span>
                    </div>
                  </div>

                  {/* Genre Row */}
                  <div className="flex flex-wrap gap-2">
                    {anime.genres.map((genre) => (
                      <span
                        key={genre}
                        className="rounded-lg border border-[--border] bg-[--bg-raised] px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-[--cream-secondary] cursor-default"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>

                  {/* Synopsis - This area needs to be explicitly long and scrollable if contained */}
                  <div className="flex flex-col gap-3 pb-8">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[--cream-muted]">
                      <BookOpen size={14} />
                      Synopsis
                    </div>
                    <div 
                      className="text-sm leading-relaxed text-[--cream-secondary] opacity-90 prose prose-invert max-w-none md:text-base prose-p:mb-4"
                      dangerouslySetInnerHTML={{ __html: anime.description || "No synopsis available." }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
