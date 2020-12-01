import { MovieListResult } from './movie-list-result';
import { PersonListResult } from './person-list-result';
import { TvListResult } from './tv-list-result';

export interface MultiSearchResponse {
  page: number;
  results: MovieListResult[] | TvListResult[] | PersonListResult[];
  total_results: number;
  total_pages: number;
}
