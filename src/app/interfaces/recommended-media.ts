import { MediaType } from './media-type';

export interface RecommendedMedia {
    title: string;
    id: number;
    type: MediaType;
    posterPath: string;
}
