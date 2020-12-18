import { PersonListResponse } from './person-list-response';

export interface PersonSearchResponse {
    page: number;
    results: PersonListResponse[];
    total_results: number;
    total_pages: number;
}
