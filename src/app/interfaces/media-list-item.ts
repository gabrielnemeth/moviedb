import { MediaType } from './media-type';

export interface MediaListItem {
    id: number;
    type: MediaType;
    title: string;
    img?: {
        poster?: string | null;
        backdrop?: string | null;
    };
    releaseDate?: string;
    genresIds?: number[];
    voteAverage?: number;
    popularity?: number;
}
