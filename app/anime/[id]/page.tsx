import React from "react";
import { Star, Calendar, Tv, Users, Play, BookOpen, MessageSquare, Info } from "lucide-react";
import { getAnimeById } from "@/lib/api";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function AnimeDetailsPage({ params }: { params: { id: string } }) {
  const anime = await getAnimeById(params.id);

  if (!anime) {
    return (
      <div className="flex h-screen items-center justify-center bg-[--bg-base]">
        <p className="text-xl text-[--cream]">Anime not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[--bg-base] text-[--cream]">
      <Navbar />

      <main className="relative pb-40">
        {/* Banner Hero */}
        <div className="relative h-[40vh] w-full lg:h-[60vh]">
          <Image
            src={anime.bannerImage || anime.coverImage.extraLarge}
            alt={anime.title.english || anime.title.romaji}
            fill
            className="object-cover opacity-30 blur-sm md:opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[--bg-base] to-transparent" />
        </div>

        {/* Content Container */}
        <div className="mx-auto -mt-32 max-w-[1440px] px-6 lg:px-12">
          <div className="flex flex-col gap-10 lg:flex-row">
            {/* Sidebar Poster */}
            <div className="flex shrink-0 flex-col gap-6 lg:w-[320px]">
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-3xl border border-[--border] shadow-2xl">
                <Image
                  src={anime.coverImage.extraLarge}
                  alt={anime.title.english || anime.title.romaji}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="hidden flex-col gap-6 lg:flex">
                <div className="rounded-3xl border border-[--border] bg-[--bg-surface] p-6 shadow-xl">
                  <h3 className="mb-4 text-sm font-black uppercase tracking-widest text-[--gold]">
                    Metadata
                  </h3>
                  <div className="flex flex-col gap-4 text-sm">
                    <div className="flex justify-between border-b border-[--border] pb-2">
                       <span className="text-[--cream-muted]">Airing Status</span>
                       <span className="font-bold text-[--cream]">{anime.status}</span>
                    </div>
                    <div className="flex justify-between border-b border-[--border] pb-2">
                       <span className="text-[--cream-muted]">Season Year</span>
                       <span className="font-bold text-[--cream]">{anime.seasonYear}</span>
                    </div>
                    <div className="flex justify-between border-b border-[--border] pb-2">
                       <span className="text-[--cream-muted]">Primary Studio</span>
                       <span className="font-bold text-[--orange]">{anime.studios.nodes[0]?.name || "Unknown"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Details */}
            <div className="flex flex-1 flex-col gap-10">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  {anime.genres.slice(0, 3).map((genre: string) => (
                    <Badge key={genre} variant="outline" className="border-[--gold] text-[--gold]">
                      {genre}
                    </Badge>
                  ))}
                  <Badge className="bg-[--orange] text-[--bg-base]">{anime.status}</Badge>
                </div>

                <h1 className="text-4xl font-black leading-tight tracking-tighter md:text-6xl lg:text-7xl">
                  {anime.title.english || anime.title.romaji}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-[--cream-muted]">
                   <div className="flex items-center gap-2 text-[--gold]">
                      <Star size={20} fill="currentColor" />
                      <span className="text-2xl font-black text-[--cream-secondary]">{anime.averageScore / 10} Score</span>
                   </div>
                   <div className="flex items-center gap-2"><Tv size={18} /> {anime.episodes || '?'} Episodes</div>
                   <div className="flex items-center gap-2"><Calendar size={18} /> {anime.seasonYear}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                 <Button className="h-14 rounded-full bg-[--orange] px-10 text-lg font-black text-[--bg-base] chakra-glow hover:brightness-110 active:scale-95 transition-all">
                    <Play fill="currentColor" size={24} className="mr-2" />
                    Watch Episode 1
                 </Button>
                 <Button variant="outline" className="h-14 rounded-full border-[--border] px-8 text-lg font-bold hover:bg-[--bg-surface] transition-all">
                    <Info size={24} className="mr-2" />
                    Add to Library
                 </Button>
              </div>

              {/* Synopsis */}
              <div className="flex flex-col gap-4">
                 <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[--cream-muted]">
                    <BookOpen size={16} />
                    Synopsis
                 </div>
                 <div 
                   className="text-lg leading-relaxed text-[--cream-secondary] prose prose-invert max-w-none"
                   dangerouslySetInnerHTML={{ __html: anime.description || "No description available." }}
                 />
              </div>

              {/* Episodes Grid if available */}
              {anime.streamingEpisodes && anime.streamingEpisodes.length > 0 && (
                <div className="mt-10 flex flex-col gap-8">
                  <div className="flex items-center gap-4">
                    <h2 className="text-3xl font-black tracking-tighter">Episodes</h2>
                    <Badge variant="outline" className="border-[--border] text-[--cream-muted]">
                      {anime.streamingEpisodes.length} Available
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {anime.streamingEpisodes.map((ep: any, idx: number) => (
                      <Link 
                        key={idx} 
                        href="#"
                        className="group flex flex-col gap-3 rounded-2xl border border-[--border] bg-[--bg-surface] p-3 transition-all hover:chakra-glow hover:border-[--orange]/40"
                      >
                        <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                          <Image src={ep.thumbnail || anime.coverImage.extraLarge} alt={ep.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                             <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[--orange] text-[--bg-base] chakra-glow">
                                <Play size={24} fill="currentColor" />
                             </div>
                          </div>
                          <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-[10px] font-bold text-white">
                             EP {idx + 1}
                          </div>
                        </div>
                        <div className="px-1">
                          <h4 className="line-clamp-2 text-sm font-bold leading-snug text-[--cream] transition-colors group-hover:text-[--orange]">
                            {ep.title}
                          </h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
