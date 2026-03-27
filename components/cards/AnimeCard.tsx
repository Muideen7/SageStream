"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Play, Trophy } from "lucide-react";
import { AnimeCardProps } from "@/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const AnimeCard = (props: AnimeCardProps & { onClick?: (anime: AnimeCardProps) => void }) => {
  const {
    title,
    thumbnail,
    rating,
    episodes,
    genres,
    isNew,
    isTrending,
    rank,
    variant = 'poster',
    releaseYear,
    onClick
  } = props;
  const isPoster = variant === 'poster';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onClick && onClick(props)}
      className={cn(
        "group relative flex w-full flex-col overflow-hidden rounded-xl border border-[--border] bg-[--bg-surface] transition-all hover:chakra-glow hover:border-[--orange]/30 cursor-pointer",
        rank === 1 && "ring-2 ring-[--gold]"
      )}
    >
      {/* Thumbnail Layer */}
      <div className={cn("relative w-full overflow-hidden", isPoster ? "aspect-[2/3]" : "aspect-[16/9]")}>
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Play Overlay (Desktop) */}
        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 z-10 hidden items-center justify-center bg-black/60 backdrop-blur-[2px] md:flex"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[--orange] text-[--bg-base] chakra-glow"
            >
              <Play size={24} fill="currentColor" />
            </motion.div>
            
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
              {genres.slice(0, 2).map(genre => (
                <Badge key={genre} variant="outline" className="text-[10px] text-[--cream-muted] border-[--border]">
                  {genre}
                </Badge>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Mobile indicators */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 md:hidden">
          <Play size={32} className="text-white opacity-40" />
        </div>

        {/* Top Badges */}
        <div className="absolute top-2 right-2 z-20 flex flex-col items-end gap-2">
          {isNew && (
            <Badge className="bg-[--crimson-bright] text-[--cream] text-[10px] font-black uppercase tracking-wider rounded-full h-5 px-2">
              NEW
            </Badge>
          )}
          {isTrending && !isNew && (
            <Badge className="bg-[--orange] text-[--bg-base] text-[10px] font-black uppercase tracking-wider rounded-full h-5 px-2">
              HOT
            </Badge>
          )}
          {rank && rank <= 3 && (
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[--gold] text-[--bg-base] chakra-glow-gold">
              <Trophy size={14} fill="currentColor" />
            </div>
          )}
        </div>

        {/* Rank Number (if 4+) */}
        {rank && rank > 3 && (
          <div className="absolute top-2 left-2 z-20 font-mono text-2xl font-black text-[--cream-muted] opacity-40">
            {rank}
          </div>
        )}
      </div>

      {/* Info Container */}
      <div className="flex flex-col gap-1 p-2.5 md:p-3">
        <h3 className="line-clamp-1 text-xs font-bold text-[--cream] group-hover:text-[--orange] transition-colors md:text-sm lg:text-base">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-[9px] font-medium text-[--cream-muted] md:text-[10px]">
          <div className="flex items-center gap-0.5 text-[--gold]">
            <Star size={10} fill="currentColor" className="md:size-3" />
            <span>{rating}</span>
          </div>
          <span>•</span>
          <span>{episodes} EP</span>
          <span>•</span>
          <span>{releaseYear || '2024'}</span>
        </div>
      </div>
    </motion.div>
  );
};
