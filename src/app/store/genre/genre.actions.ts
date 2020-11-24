import { createAction, props } from '@ngrx/store';
import { Genre } from './genre';

export const fetchGenres = createAction('[Movie Page] Trigger Genre Fetch');

export const genresLoaded = createAction(
  '[Movies API] Genres Loaded Success',
  props<{ list: Genre[] }>()
);
