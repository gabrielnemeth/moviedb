import { Action, createReducer, on } from '@ngrx/store';
import { MovieListResult } from '../../interfaces/movie-list-result';
import { State } from '../state';
import {
    setSelectedMediaType,
    trendingMoviesLoaded,
    trendingTvsLoaded,
} from './trending.actions';
import { MediaType } from '../../interfaces/media-type';
import { TvListResult } from '../../interfaces/tv-list-result';

export interface TrendingState {
    movies: MovieListResult[];
    tv: TvListResult[];
    selectedMediaType: MediaType;
}

const initialState: TrendingState = {
    movies: [],
    tv: [],
    selectedMediaType: MediaType.movie,
};

const trendingReducer = createReducer(
    initialState,
    on(trendingMoviesLoaded, (state, data) => ({
        ...state,
        movies: data.movies,
    })),
    on(trendingTvsLoaded, (state, data) => ({
        ...state,
        tv: data.tv,
    })),
    on(setSelectedMediaType, (state, data) => ({
        ...state,
        selectedMediaType: data.selectedMediaType,
    }))
);
export function reducer(
    state: TrendingState | undefined,
    action: Action
): TrendingState {
    return trendingReducer(state, action);
}

export const selectTrendingMovies = (state: State): MovieListResult[] =>
    state.trending.movies;

export const selectTrendingTvs = (state: State): TvListResult[] =>
    state.trending.tv;

export const selectSelectedMediaType = (state: State): MediaType =>
    state.trending.selectedMediaType;
