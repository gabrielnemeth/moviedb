import { Action, createReducer, on } from '@ngrx/store';
import { State } from '../state';
import {
    setSelectedMediaType,
    trendingMoviesLoaded,
    trendingTvsLoaded,
} from './trending.actions';
import { MediaType } from '../../interfaces/media-type';
import { MediaListItem } from '../../interfaces/media-list-item';

export interface TrendingState {
    list: MediaListItem[];
    selectedMediaType: MediaType;
}

const initialState: TrendingState = {
    list: [],
    selectedMediaType: MediaType.movie,
};

const trendingReducer = createReducer(
    initialState,
    on(trendingMoviesLoaded, (state, data) => ({
        ...state,
        list: [...state.list, ...data.list],
    })),
    on(trendingTvsLoaded, (state, data) => ({
        ...state,
        list: [...state.list, ...data.list],
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

export const selectTrendingMedia = (state: State): MediaListItem[] =>
    state.trending.list;

export const selectSelectedMediaType = (state: State): MediaType =>
    state.trending.selectedMediaType;
