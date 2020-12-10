import { createAction, props } from '@ngrx/store';
import { MovieListResult } from '../../interfaces/movie-list-result';
import { MediaType } from '../../interfaces/media-type';

export const fetchTrending = createAction(
    '[Home Page] Initiating Trending Fetch'
);

export const trendingLoaded = createAction(
    '[Movies API] Trending Loaded Success',
    props<{ list: MovieListResult[] }>()
);

export const setSelectedMediaType = createAction(
    '[Trending Component] Trending MediaType Selected',
    props<{ selectedMediaType: MediaType }>()
);
