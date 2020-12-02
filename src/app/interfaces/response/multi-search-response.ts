import { MovieListResponse } from './movie-list-response';
import { PersonListResponse } from './person-list-response';
import { TvListResponse } from './tv-list-response';

export interface MultiSearchResponse {
  page: number;
  results: MovieListResponse[] | TvListResponse[] | PersonListResponse[];
  total_results: number;
  total_pages: number;
}
