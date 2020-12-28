import { AuthorDetails } from './author-details';

export interface Review {
    author: string;
    author_details: AuthorDetails;
    content: string;
    created_at: string;
    id: string;
    updated_at: string;
    url: string;
}
