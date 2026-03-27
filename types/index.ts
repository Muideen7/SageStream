export type AnimeVariant = 'poster' | 'episode';

export interface AnimeCardProps {
  id: string;
  title: string;
  thumbnail: string;
  rating: number;
  episodes: number;
  genres: string[];
  isNew?: boolean;
  isTrending?: boolean;
  rank?: number;
  variant?: AnimeVariant;
  studio?: string;
}

export interface NavLink {
  label: string;
  path: string;
}
