"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Loader } from "@/components/layout/Loader";
import { Hero } from "@/components/sections/Hero";
import { FeaturedCarousel } from "@/components/sections/Featured";
import { TrendingGrid } from "@/components/sections/Trending";
import { GenreRail } from "@/components/sections/GenreRail";
import { NewReleases } from "@/components/sections/NewReleases";
import { Originals } from "@/components/sections/Originals";
import { Stats } from "@/components/sections/Stats";
import { CTABanner } from "@/components/sections/CTA";
import { Footer } from "@/components/layout/Footer";
import { MagatamaDivider } from "@/components/shared/MagatamaDivider";
import { BottomNav } from "@/components/layout/BottomNav";
import { AnimeCardProps } from "@/types";

interface LandingPageClientProps {
  featured: AnimeCardProps | null;
  trending: AnimeCardProps[];
  newReleases: AnimeCardProps[];
  top: AnimeCardProps[];
  donghua: AnimeCardProps[];
}

export function LandingPageClient({ featured, trending, newReleases, top, donghua }: LandingPageClientProps) {
  const [heroVisible, setHeroVisible] = useState(false);
  const router = useRouter();

  const handleCardClick = (anime: AnimeCardProps) => {
    router.push(`/anime/${anime.id}`);
  };

  return (
    <>
      <Loader onComplete={() => setHeroVisible(true)} />
      
      <main className="relative flex min-h-screen flex-col bg-[--bg-base]">
        <Navbar />
        
        <div id="home">
          <Hero isVisible={heroVisible} data={featured} />
        </div>
        
        <MagatamaDivider />
        <div id="featured">
          <FeaturedCarousel data={trending} onCardClick={handleCardClick} />
        </div>
        
        <div id="trending">
          <TrendingGrid data={top} onCardClick={handleCardClick} />
        </div>
        
        <MagatamaDivider />
        <GenreRail />
        
        <div id="simulcast">
          <NewReleases data={newReleases} onCardClick={handleCardClick} />
        </div>
        
        <MagatamaDivider />
        <div id="originals">
          <Originals data={donghua} onCardClick={handleCardClick} />
        </div>
        
        <Stats />
        
        <MagatamaDivider />
        <CTABanner />
        
        <Footer />
      </main>

      <BottomNav />
    </>
  );
}
