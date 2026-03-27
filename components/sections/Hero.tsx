"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Play, Plus, ChevronDown } from "lucide-react";
import { AnimeCardProps } from "@/types";
import gsap from "gsap";
import { Button } from "@/components/ui/button";

interface HeroProps {
  isVisible: boolean;
  data?: AnimeCardProps | null;
}

export const Hero = ({ isVisible, data }: HeroProps) => {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const anime = data;

  useEffect(() => {
    if (isVisible && h1Ref.current && anime) {
      const words = h1Ref.current.innerText.split(" ");
      h1Ref.current.innerHTML = words
        .map(word => `<span class="inline-block overflow-hidden pb-2 mr-4"><span class="inline-block translate-y-full clip-inset-full">${word}</span></span>`)
        .join("");

      gsap.to(h1Ref.current.querySelectorAll("span > span"), {
        y: 0,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.4,
      });
    }
  }, [isVisible]);

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-end overflow-hidden pb-12 lg:pb-24">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        {(anime?.banner || anime?.thumbnail) && (
          <Image
            src={anime.banner || anime.thumbnail}
            alt={anime.title}
            fill
            priority
            className="object-cover object-center opacity-80"
          />
        )}
        <div className="hero-gradient absolute inset-0 z-10" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[--bg-base] to-transparent z-10" />
      </div>

      <AnimatePresence>
        {isVisible && anime && (
          <div className="relative z-20 mx-auto w-full max-w-[1440px] px-6 lg:px-12">
            <div className="flex max-w-2xl flex-col items-start gap-6">
              {/* Category Chip */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-full border border-[--border-gold] bg-[--border-gold]/5 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[--gold]"
              >
                ⚡ NOW STREAMING
              </motion.div>

              {/* H1 Headline */}
              <h1
                ref={h1Ref}
                className="text-4xl font-black leading-[1.1] tracking-tighter text-[--cream] md:text-7xl lg:text-8xl"
              >
                {anime.title}
              </h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="max-w-lg text-base leading-relaxed text-[--cream-secondary] md:text-lg"
              >
                Discover the latest arc. Immerse yourself in the world of high-definition anime streaming with SageStream.
              </motion.p>

              {/* Metadata Row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="flex flex-wrap items-center gap-4 text-xs font-medium text-[--cream-muted] md:text-sm"
              >
                <div className="flex items-center gap-1 text-[--gold-bright]">
                  <Star size={16} fill="currentColor" />
                  <span className="font-bold">{anime.rating}</span>
                </div>
                <span>·</span>
                <span>{anime.episodes} episodes</span>
                <span>·</span>
                <span>2024</span>
                <div className="flex gap-2">
                  {anime.genres?.slice(0, 3).map(genre => (
                    <span key={genre} className="rounded-full border border-[--border] px-2 py-0.5 uppercase tracking-wider text-[10px]">
                      {genre}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* CTA Row */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="flex flex-wrap items-center gap-4 pt-4"
              >
                <Button className="h-12 rounded-full bg-[--orange] px-8 font-bold text-[--bg-base] hover:bg-[--orange-bright] chakra-glow active:scale-95 transition-all">
                  <Play size={18} fill="currentColor" className="mr-2" />
                  Watch Now
                </Button>
                <Button variant="ghost" className="h-12 rounded-full border border-[--border] px-8 font-bold text-[--cream] hover:border-[--orange]/40 hover:text-[--orange] transition-all">
                  <Plus size={18} className="mr-2" />
                  Add to Watchlist
                </Button>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-[--cream-muted]">Scroll</span>
        <div className="animate-chakra-pulse">
          <ChevronDown size={20} className="text-[--orange]" />
        </div>
      </motion.div>
    </section>
  );
};
