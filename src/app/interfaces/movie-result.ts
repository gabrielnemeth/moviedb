import { MovieListResult } from './movie-list-result';

export interface MovieSearchResponse {
  page: number;
  results: MovieListResult[];
  total_results: number;
  total_pages: number;
}
