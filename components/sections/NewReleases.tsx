"use client";

import React from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimeCard } from "@/components/cards/AnimeCard";
import { AnimeCardProps } from "@/types";

interface NewReleasesProps {
  data?: AnimeCardProps[];
  onCardClick?: (anime: AnimeCardProps) => void;
}

export const NewReleases = ({ data = [], onCardClick }: NewReleasesProps) => {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 lg:px-12 py-12 lg:py-24">
      <div className="flex items-center gap-4 mb-12">
        <div className="h-2 w-2 rounded-full bg-[--crimson-bright] chakraPulse animate-chakra-pulse" />
        <SectionHeading title="Just Dropped" />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {data.map((anime: AnimeCardProps) => (
          <div key={anime.id} className="flex flex-col gap-4">
             <AnimeCard 
              {...anime} 
              variant="episode"
              onClick={onCardClick}
            />
            <div className="flex flex-col gap-1 px-1">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[--cream-muted]">
                {anime.studio}
              </span>
              <h4 className="text-lg font-bold text-[--cream] line-clamp-1">
                {anime.title.includes(':') ? anime.title.split(':')[0] : anime.title}
              </h4>
              <p className="text-sm font-medium text-[--gold]">
                {anime.title.includes('Ep.') ? anime.title.split(':').slice(-1)[0].trim() : "Episode 01"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
