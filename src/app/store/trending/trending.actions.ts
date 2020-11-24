import { createAction, props } from '@ngrx/store';
import { Movie } from '../movie/movie';

export const fetchTrending = createAction(
  '[Home Page] Initiating Trending Fetch'
);

export const trendingLoaded = createAction(
  '[Movies API] Trending Loaded Success',
  props<{ list: Movie[] }>()
);
