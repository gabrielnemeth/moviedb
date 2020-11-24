import { GenreState } from './genre/genre.reducer';
import { MovieState } from './movie/movie.reducer';
import { TrendingState } from './trending/trending.reducer';

export interface State {
  movies: MovieState;
  trending: TrendingState;
  genres: GenreState;
}
