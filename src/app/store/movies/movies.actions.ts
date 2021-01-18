import { createAction, props } from '@ngrx/store';
import { MediaListItem } from '../../interfaces/media-list-item';

export const fetchPopularMovies = createAction(
    '[Movies Page] Initiating Popular Movies Fetch'
);

export const popularMoviesLoaded = createAction(
    '[Movies API] Popular Movies Loaded Success',
    props<{ list: MediaListItem[] }>()
);

export const fetchNowPlayingMovies = createAction(
    '[Movies Page] Initiating Now Playing Movies Fetch'
);

export const nowPlayingMoviesLoaded = createAction(
    '[Movies API] Now Playing Movies Loaded Success',
    props<{ list: MediaListItem[] }>()
);

export const fetchUpcomingMovies = createAction(
    '[Movies Page] Initiating Upcoming Movies Fetch'
);

export const upcomingMoviesLoaded = createAction(
    '[Movies API] Upcoming Movies Loaded Success',
    props<{ list: MediaListItem[] }>()
);

export const fetchTopRatedMovies = createAction(
    '[Movies Page] Initiating Top Rated Movies Fetch'
);

export const topRatedMoviesLoaded = createAction(
    '[Movies API] Top Rated Movies Loaded Success',
    props<{ list: MediaListItem[] }>()
);

export const selectMoviesFilterType = createAction(
    '[Movies Page] Select Movies Filter Type',
    props<{ selectedMoviesFilterType: string }>()
);
