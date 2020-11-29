import { createAction, props } from '@ngrx/store';
import { MovieListResult } from '../../interfaces/movie-list-result';

export const movieSearch = createAction(
  '[Movie Page] Search Movies',
  props<{ query: string }>()
);

export const moviesLoaded = createAction(
  '[Movies API] Movies Loaded Success',
  props<{ list: MovieListResult[] }>()
);
