import { MovieListResult } from './movie-list-result';
import { PersonListResult } from './person-list-result';
import { TvListResult } from './tv-list-result';

export type MediaListResult = MovieListResult | TvListResult | PersonListResult;
