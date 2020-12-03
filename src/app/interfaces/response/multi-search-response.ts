import { MediaListResult } from '../media-list-result';

export interface MultiSearchResponse {
  page: number;
  results: MediaListResult[];
  total_results: number;
  total_pages: number;
}
