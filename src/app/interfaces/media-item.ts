import { MediaType } from './media-type';
import { Credits } from './credits';

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
    runtime?: number;
    trailerVideoId?: string;
    credits?: Credits;
}
