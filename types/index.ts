export type AnimeVariant = 'poster' | 'episode';

export interface AnimeCardProps {
  id: string;
  title: string;
  thumbnail: string;
  banner?: string;
  rating: number;
  episodes: number;
  genres: string[];
  isNew?: boolean;
  isTrending?: boolean;
  rank?: number;
  variant?: AnimeVariant;
  studio?: string;
  description?: string;
  releaseYear?: number;
  status?: string;
}

export interface NavLink {
  label: string;
  path: string;
}
