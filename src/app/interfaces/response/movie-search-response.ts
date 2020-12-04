import { MovieListResponse } from './movie-list-response';

export interface MovieSearchResponse {
    page: number;
    results: MovieListResponse[];
    total_results: number;
    total_pages: number;
}
