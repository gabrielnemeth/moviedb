import { createAction, props } from '@ngrx/store';
import { MovieListResult } from '../../interfaces/movie-list-result';
import { MediaType } from '../../interfaces/media-type';
import { TvListResult } from '../../interfaces/tv-list-result';

export const fetchTrendingMovies = createAction(
    '[Trending Component] Initiating Trending Movies Fetch'
);

export const fetchTrendingTvs = createAction(
    '[Trending Component] Initiating Trending TV Shows Fetch'
);

export const trendingMoviesLoaded = createAction(
    '[Movies API] Trending Movies Loaded Success',
    props<{ movies: MovieListResult[] }>()
);

export const trendingTvsLoaded = createAction(
    '[Movies API] Trending TV Shows Loaded Success',
    props<{ tv: TvListResult[] }>()
);

export const setSelectedMediaType = createAction(
    '[Trending Component] Trending MediaType Selected',
    props<{ selectedMediaType: MediaType }>()
);
