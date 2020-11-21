import { createAction, props } from '@ngrx/store';
import { Movie } from './../movie';

export const movieSearch = createAction(
  '[Movie Page] Search Movies',
  props<{ query: string }>()
);

export const moviesLoaded = createAction(
  '[Movies API] Movies Loaded Success',
  props<{ list: Movie[] }>()
);
