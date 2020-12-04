import { createAction, props } from '@ngrx/store';
import { MovieListResult } from '../../interfaces/movie-list-result';

export const fetchTrending = createAction(
    '[Home Page] Initiating Trending Fetch'
);

export const trendingLoaded = createAction(
    '[Movies API] Trending Loaded Success',
    props<{ list: MovieListResult[] }>()
);
