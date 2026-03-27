import { LandingPageClient } from "@/components/layout/LandingPageClient";
import { getFeaturedAnime, getTrendingAnime, getNewReleases, getTopAnime, getChineseAnime } from "@/lib/api";

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const [featured, trending, newReleases, top, donghua] = await Promise.all([
    getFeaturedAnime(),
    getTrendingAnime(12),
    getNewReleases(6),
    getTopAnime(8),
    getChineseAnime(6),
  ]);

  return (
    <LandingPageClient 
      featured={featured}
      trending={trending}
      newReleases={newReleases}
      top={top}
      donghua={donghua}
    />
  );
}
