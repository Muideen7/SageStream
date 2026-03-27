"use client";

import React from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimeCard } from "@/components/cards/AnimeCard";
import { AnimeCardProps } from "@/types";

interface TrendingGridProps {
  data?: AnimeCardProps[];
  onCardClick?: (anime: AnimeCardProps) => void;
}

export const TrendingGrid = ({ data = [], onCardClick }: TrendingGridProps) => {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 lg:px-12 py-12 lg:py-24">
      <SectionHeading title="Most Watched Right Now" className="mb-12" />
      
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {data.map((anime: AnimeCardProps, idx: number) => (
          <AnimeCard 
            key={anime.id} 
            {...anime} 
            rank={idx + 1}
            onClick={onCardClick}
          />
        ))}
      </div>
    </section>
  );
};
