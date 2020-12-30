import { Action, createReducer, on } from '@ngrx/store';
import { State } from '../state';
import { searchedMediaLoaded } from './searched-media.actions';
import { MediaListItem } from '../../interfaces/media-list-item';

export interface SearchedMediaState {
    list: MediaListItem[];
}

const initialState: SearchedMediaState = {
    list: [],
};

const movieReducer = createReducer(
    initialState,
    on(searchedMediaLoaded, (state, data) => ({ ...state, list: data.list }))
);

export const reducer = (
    state: SearchedMediaState | undefined,
    action: Action
): SearchedMediaState => movieReducer(state, action);

export const selectSearchedMedia = (state: State): MediaListItem[] =>
    state.searchResult.list;
