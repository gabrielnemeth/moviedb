import { GenreState } from './genre.reducer';
import { MovieState } from './movie.reducer';

export interface State {
  movies: MovieState;
  genres: GenreState;
}
