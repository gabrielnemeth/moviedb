import { GenreState } from './genre/genre.reducer';
import { MovieState } from './movie/movie.reducer';

export interface State {
  movies: MovieState;
  genres: GenreState;
}
