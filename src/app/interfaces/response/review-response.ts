import { Review } from '../review';

export interface ReviewResponse {
    id: number;
    page: number;
    results: Review[];
    total_pages: number;
    total_results: number;
}
