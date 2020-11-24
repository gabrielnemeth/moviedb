import { Movie } from './store/movie/movie';

export interface SearchResult {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}
