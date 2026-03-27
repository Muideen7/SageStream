"use client";

import React, { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import { searchAnime } from "@/lib/api";
import { AnimeCardProps } from "@/types";
import { AnimeCard } from "@/components/cards/AnimeCard";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { useRouter } from "next/navigation";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AnimeCardProps[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim().length > 2) {
        setLoading(true);
        const data = await searchAnime(query);
        setResults(data);
        setLoading(false);
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleCardClick = (anime: AnimeCardProps) => {
    router.push(`/anime/${anime.id}`);
  };

  return (
    <div className="min-h-screen bg-[--bg-base]">
      <Navbar />
      
      <main className="mx-auto max-w-[1440px] px-6 pt-32 pb-40 lg:px-12">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-[--cream] md:text-6xl">
              Search Arcs
            </h1>
            <p className="mt-2 text-sm text-[--cream-muted]">
              Explore thousands of anime and donghua.
            </p>
          </div>

          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[--cream-muted]" size={20} />
            <input
              type="text"
              placeholder="Search for titles..."
              className="h-14 w-full rounded-full border border-[--border] bg-[--bg-surface] pl-12 pr-6 text-sm text-[--cream] focus:border-[--orange] focus:outline-none transition-all shadow-xl"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        {loading ? (
          <div className="flex h-64 w-full items-center justify-center">
            <Loader2 className="animate-spin text-[--orange]" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {results.map((anime) => (
              <AnimeCard 
                key={anime.id} 
                {...anime} 
                onClick={handleCardClick}
              />
            ))}

            {!loading && query.length > 2 && results.length === 0 && (
              <div className="col-span-full py-20 text-center">
                <p className="text-lg text-[--cream-muted]">No results found for "{query}"</p>
              </div>
            )}

            {query.length <= 2 && (
              <div className="col-span-full py-20 text-center opacity-40">
                <p className="text-lg text-[--cream-muted]">Type at least 3 characters to search...</p>
              </div>
            )}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
