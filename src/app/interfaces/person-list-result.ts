import { MovieListResult } from './movie-list-result';
import { TvListResult } from './tv-list-result';
export interface PersonListResult {
  profile_path: null | string;
  adult: boolean;
  id: number;
  known_for: (TvListResult | MovieListResult)[];
  name: string;
  popularity: number;
}
