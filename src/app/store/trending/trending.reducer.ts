import { Action, createReducer, on } from '@ngrx/store';
import { MovieListResult } from '../../interfaces/movie-list-result';
import { State } from '../state';
import { setSelectedMediaType, trendingLoaded } from './trending.actions';
import { MediaType } from '../../interfaces/media-type';

export interface TrendingState {
    list: MovieListResult[];
    selectedMediaType: MediaType;
}

const initialState: TrendingState = {
    list: [],
    selectedMediaType: MediaType.movie,
};

const trendingReducer = createReducer(
    initialState,
    on(trendingLoaded, (state, data) => ({ ...state, list: data.list })),
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

export const selectTrending = (state: State): MovieListResult[] =>
    state.trending.list;

export const selectSelectedMediaType = (state: State): MediaType =>
    state.trending.selectedMediaType;
