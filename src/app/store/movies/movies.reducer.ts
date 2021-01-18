import { Action, createReducer, on } from '@ngrx/store';
import { State } from '../state';
import {
    nowPlayingMoviesLoaded,
    popularMoviesLoaded,
    selectMoviesFilterType,
    topRatedMoviesLoaded,
    upcomingMoviesLoaded,
} from './movies.actions';
import { MediaListItem } from '../../interfaces/media-list-item';

export interface MoviesState {
    selectedMoviesFilterType: string;
    popular: MediaListItem[];
    nowPlaying: MediaListItem[];
    upcoming: MediaListItem[];
    topRated: MediaListItem[];
}

const initialState: MoviesState = {
    selectedMoviesFilterType: 'popular',
    popular: [],
    nowPlaying: [],
    upcoming: [],
    topRated: [],
};

const moviesReducer = createReducer(
    initialState,
    on(selectMoviesFilterType, (state, data) => ({
        ...state,
        selectedMoviesFilterType: data.selectedMoviesFilterType,
    })),
    on(popularMoviesLoaded, (state, data) => ({
        ...state,
        popular: [...data.list],
    })),
    on(nowPlayingMoviesLoaded, (state, data) => ({
        ...state,
        nowPlaying: [...data.list],
    })),
    on(upcomingMoviesLoaded, (state, data) => ({
        ...state,
        upcoming: [...data.list],
    })),
    on(topRatedMoviesLoaded, (state, data) => ({
        ...state,
        topRated: [...data.list],
    }))
);
export const reducer = (
    state: MoviesState | undefined,
    action: Action
): MoviesState => moviesReducer(state, action);

export const selectSelectedMoviesFilterType = (state: State): string =>
    state.movies.selectedMoviesFilterType;

export const selectMoviesByFilterType = (state: State): MediaListItem[] => {
    if (state.movies.selectedMoviesFilterType === 'popular') {
        return state.movies.popular;
    }

    if (state.movies.selectedMoviesFilterType === 'now-playing') {
        return state.movies.nowPlaying;
    }

    if (state.movies.selectedMoviesFilterType === 'upcoming') {
        return state.movies.upcoming;
    }

    if (state.movies.selectedMoviesFilterType === 'top-rated') {
        return state.movies.topRated;
    }

    throw TypeError('Wrong filter type');
};
