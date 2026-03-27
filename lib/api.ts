import { AnimeCardProps } from "@/types";

const ANILIST_URL = "https://graphql.anilist.co";

const anilistQuery = async (query: string, variables: any = {}) => {
  try {
    const res = await fetch(ANILIST_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    return await res.json();
  } catch (error) {
    console.error("AniList API Error:", error);
    return null;
  }
};

const mapAnilistToAnime = (media: any, idx?: number): AnimeCardProps => {
  return {
    id: String(media.id),
    title: media.title.english || media.title.romaji,
    thumbnail: media.coverImage.extraLarge || media.coverImage.large,
    banner: media.bannerImage,
    rating: media.averageScore / 10 || 0,
    episodes: media.episodes || 0,
    genres: media.genres || [],
    isTrending: true,
    isNew: media.status === 'RELEASING',
    rank: idx !== undefined ? idx + 1 : undefined,
    studio: media.studios?.nodes?.[0]?.name || "Unknown Studio",
    description: media.description,
    releaseYear: media.seasonYear,
    status: media.status,
  };
};

export async function getFeaturedAnime(): Promise<AnimeCardProps | null> {
  const query = `
    query ($season: MediaSeason, $year: Int) {
      Page(page: 1, perPage: 1) {
        media(season: $season, seasonYear: $year, sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
          id title { english romaji } bannerImage coverImage { extraLarge } averageScore episodes genres studios { nodes { name } } status description seasonYear
        }
      }
    }
  `;
  const variables = { season: "WINTER", year: 2024 };
  const json = await anilistQuery(query, variables);
  return json?.data?.Page?.media?.[0] ? mapAnilistToAnime(json.data.Page.media[0]) : null;
}

export async function getTrendingAnime(limit = 12): Promise<AnimeCardProps[]> {
  const query = `
    query ($limit: Int) {
      Page(page: 1, perPage: $limit) {
        media(sort: TRENDING_DESC, type: ANIME, isAdult: false) {
          id title { english romaji } coverImage { extraLarge } averageScore episodes genres studios { nodes { name } } status description seasonYear
        }
      }
    }
  `;
  const json = await anilistQuery(query, { limit });
  return json?.data?.Page?.media ? json.data.Page.media.map((m: any) => mapAnilistToAnime(m)) : [];
}

export async function getTopAnime(limit = 8): Promise<AnimeCardProps[]> {
  const query = `
    query ($limit: Int) {
      Page(page: 1, perPage: $limit) {
        media(sort: SCORE_DESC, type: ANIME, isAdult: false) {
          id title { english romaji } coverImage { extraLarge } averageScore episodes genres studios { nodes { name } } status description seasonYear
        }
      }
    }
  `;
  const json = await anilistQuery(query, { limit });
  return json?.data?.Page?.media ? json.data.Page.media.map((m: any, idx: number) => mapAnilistToAnime(m, idx)) : [];
}

export async function getNewReleases(limit = 6): Promise<AnimeCardProps[]> {
  const query = `
    query ($limit: Int) {
      Page(page: 1, perPage: $limit) {
        media(status: RELEASING, sort: START_DATE_DESC, type: ANIME, isAdult: false) {
          id title { english romaji } coverImage { extraLarge } averageScore episodes genres studios { nodes { name } } status description seasonYear
        }
      }
    }
  `;
  const json = await anilistQuery(query, { limit });
  return json?.data?.Page?.media ? json.data.Page.media.map((m: any) => mapAnilistToAnime(m)) : [];
}

export async function getChineseAnime(limit = 6): Promise<AnimeCardProps[]> {
  const query = `
    query ($limit: Int) {
      Page(page: 1, perPage: $limit) {
        media(countryOfOrigin: "CN", sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
          id title { english romaji } coverImage { extraLarge } bannerImage averageScore episodes genres studios { nodes { name } } status description seasonYear
        }
      }
    }
  `;
  const json = await anilistQuery(query, { limit });
  return json?.data?.Page?.media ? json.data.Page.media.map((m: any) => mapAnilistToAnime(m)) : [];
}

export async function searchAnime(search: string, limit = 20): Promise<AnimeCardProps[]> {
  const query = `
    query ($search: String, $limit: Int) {
      Page(page: 1, perPage: $limit) {
        media(search: $search, type: ANIME, isAdult: false) {
          id title { english romaji } coverImage { extraLarge } bannerImage averageScore episodes genres studios { nodes { name } } status description seasonYear
        }
      }
    }
  `;
  const json = await anilistQuery(query, { search, limit });
  return json?.data?.Page?.media ? json.data.Page.media.map((m: any) => mapAnilistToAnime(m)) : [];
}

export async function getAnimeById(id: string): Promise<any | null> {
  const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        id
        title { english romaji native }
        coverImage { extraLarge }
        bannerImage
        averageScore
        episodes
        genres
        status
        description
        seasonYear
        studios(isMain: true) { nodes { name } }
        streamingEpisodes { title thumbnail url }
      }
    }
  `;
  const json = await anilistQuery(query, { id: parseInt(id) });
  return json?.data?.Media || null;
}
