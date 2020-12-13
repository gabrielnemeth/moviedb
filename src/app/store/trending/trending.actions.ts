import { createAction, props } from '@ngrx/store';
import { MediaType } from '../../interfaces/media-type';
import { MediaListItem } from '../../interfaces/media-list-item';
import { TimeWindow } from '../../interfaces/time-window';

export const fetchTrendingMedia = createAction(
    '[Trending Component] Initiating Trending Media Fetch'
);

export const fetchTrendingMovies = createAction(
    '[Trending Component] Initiating Trending Movies Fetch'
);

export const fetchTrendingTvs = createAction(
    '[Trending Component] Initiating Trending TV Shows Fetch'
);

export const trendingMoviesLoaded = createAction(
    '[Movies API] Trending Movies Loaded Success',
    props<{ list: MediaListItem[] }>()
);

export const trendingTvsLoaded = createAction(
    '[Movies API] Trending TV Shows Loaded Success',
    props<{ list: MediaListItem[] }>()
);

export const trendingMediaLoaded = createAction(
    '[Movies API] Trending TV Shows Loaded Success',
    props<{ list: MediaListItem[] }>()
);

export const setSelectedMediaType = createAction(
    '[Trending Component] Trending MediaType Selected',
    props<{ selectedMediaType: MediaType }>()
);

export const setSelectedTimeWindow = createAction(
    '[Trending Component] Trending Time Period Selected',
    props<{ selectedTimeWindow: TimeWindow }>()
);
