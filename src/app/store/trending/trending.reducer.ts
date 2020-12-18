import { Action, createReducer, on } from '@ngrx/store';
import { State } from '../state';
import {
    setSelectedMediaType,
    setSelectedTimeWindow,
    trendingMediaLoaded,
} from './trending.actions';
import { MediaType } from '../../interfaces/media-type';
import { MediaListItem } from '../../interfaces/media-list-item';
import { TimeWindow } from '../../interfaces/time-window';

export interface TrendingState {
    list: MediaListItem[];
    selectedMediaType: MediaType;
    selectedTimeWindow: TimeWindow;
}

const initialState: TrendingState = {
    list: [],
    selectedMediaType: MediaType.movie,
    selectedTimeWindow: 'day',
};

const trendingReducer = createReducer(
    initialState,
    on(trendingMediaLoaded, (state, data) => ({
        ...state,
        list: [...data.list],
    })),
    on(setSelectedMediaType, (state, data) => ({
        ...state,
        selectedMediaType: data.selectedMediaType,
    })),
    on(setSelectedTimeWindow, (state, data) => ({
        ...state,
        selectedTimeWindow: data.selectedTimeWindow,
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

export const selectTimeWindow = (state: State): TimeWindow =>
    state.trending.selectedTimeWindow;
