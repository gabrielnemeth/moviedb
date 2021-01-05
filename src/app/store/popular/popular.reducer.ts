import { Action, createReducer, on } from '@ngrx/store';
import { State } from '../state';
import { popularMediaLoaded, setSelectedMediaType } from './popular.actions';
import { MediaType } from '../../interfaces/media-type';
import { MediaListItem } from '../../interfaces/media-list-item';

export interface PopularState {
    list: MediaListItem[];
    selectedMediaType: MediaType;
}

const initialState: PopularState = {
    list: [],
    selectedMediaType: MediaType.movie,
};

const popularReducer = createReducer(
    initialState,
    on(popularMediaLoaded, (state, data) => ({
        ...state,
        list: [...data.list],
    })),
    on(setSelectedMediaType, (state, data) => ({
        ...state,
        selectedMediaType: data.selectedMediaType,
    }))
);
export const reducer = (
    state: PopularState | undefined,
    action: Action
): PopularState => popularReducer(state, action);

export const selectPopularMedia = (state: State): MediaListItem[] =>
    state.popular.list;

export const selectSelectedMediaType = (state: State): MediaType =>
    state.popular.selectedMediaType;
