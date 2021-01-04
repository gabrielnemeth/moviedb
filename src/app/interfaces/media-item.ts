import { MediaType } from './media-type';
import { Cast } from './cast';
import { Review } from './review';
import { Facts } from './facts';
import { RecommendedMedia } from './recommended-media';

export interface MediaItem {
    id: number;
    type: MediaType;
    title: string;
    img?: {
        poster?: string | null;
        backdrop?: string | null;
    };
    releaseDate?: string;
    genres?: string[];
    voteAverage?: number;
    popularity?: number;
    overview?: string;
    recommendations?: RecommendedMedia[];
    reviews?: Review[];
    runtime?: number;
    trailerVideoId?: string;
    cast?: Cast[];
    facts?: Facts;
}
