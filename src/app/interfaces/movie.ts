import { Genre } from './genre';
import { Video } from './video';
import { Credits } from './credits';
import { ReviewResponse } from './response/review-response';

export interface Movie {
    adult: boolean;
    backdrop_path: string | null;
    belongs_to_collection: null;
    budget: number;
    credits?: Credits;
    genres: Genre[];
    homepage: string | null;
    id: number;
    imdb_id: string | null;
    original_language: string;
    original_title: string;
    overview?: string;
    popularity: number;
    poster_path?: string;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: string;
    recommendations?: {
        results: Movie[];
    };
    revenue: number;
    reviews?: ReviewResponse;
    runtime?: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string | null;
    title: string;
    video: boolean;
    videos?: {
        results: Video[];
    };
    vote_average: number;
    vote_count: number;
}

export interface ProductionCompany {
    id: number;
    logo_path: null | string;
    name: string;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface SpokenLanguage {
    iso_639_1: string;
    name: string;
}
