"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimeCard } from "@/components/cards/AnimeCard";
import { AnimeCardProps } from "@/types";

interface OriginalsProps {
  data?: AnimeCardProps[];
  onCardClick?: (anime: AnimeCardProps) => void;
}

export const Originals = ({ data = [], onCardClick }: OriginalsProps) => {
  return (
    <section className="bg-gradient-to-b from-transparent to-[--gold]/5 py-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <SectionHeading title="SageStream Originals & Donghua" className="mb-12" />
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.map((anime) => (
            <AnimeCard 
              key={anime.id} 
              {...anime} 
              variant="episode"
              onClick={onCardClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
