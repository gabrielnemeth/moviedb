import { TvListResponse } from './tv-list-response';

export interface TvSearchResponse {
    page: number;
    results: TvListResponse[];
    total_results: number;
    total_pages: number;
}
