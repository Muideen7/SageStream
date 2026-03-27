"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimeCard } from "@/components/cards/AnimeCard";
import { AnimeCardProps } from "@/types";
import { Button } from "@/components/ui/button";

interface FeaturedCarouselProps {
  data?: AnimeCardProps[];
  onCardClick?: (anime: AnimeCardProps) => void;
}

export const FeaturedCarousel = ({ data = [], onCardClick }: FeaturedCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 lg:px-12 py-12 lg:py-24">
      <div className="flex items-end justify-between mb-8">
        <SectionHeading title="Trending This Season" />
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll('left')}
            className="h-10 w-10 rounded-full border border-[--border] bg-[--bg-surface]/50 backdrop-blur-md text-[--cream] hover:border-[--orange]/40 hover:text-[--orange] transition-all"
          >
            <ChevronLeft size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll('right')}
            className="h-10 w-10 rounded-full border border-[--border] bg-[--bg-surface]/50 backdrop-blur-md text-[--cream] hover:border-[--orange]/40 hover:text-[--orange] transition-all"
          >
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="no-scrollbar flex gap-6 overflow-x-auto pb-4 scroll-smooth"
      >
        {data.map((anime: AnimeCardProps, idx: number) => (
          <div key={anime.id} className="w-[180px] shrink-0 md:w-[220px]">
             <AnimeCard 
              {...anime} 
              onClick={onCardClick}
             />
          </div>
        ))}
      </div>
    </section>
  );
};
