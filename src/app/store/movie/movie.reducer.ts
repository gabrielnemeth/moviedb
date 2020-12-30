import { Action, createReducer, on } from '@ngrx/store';
import { moviesLoaded } from './movie.actions';
import { MediaListItem } from '../../interfaces/media-list-item';

export interface MovieState {
    list: MediaListItem[];
}

const initialState: MovieState = {
    list: [],
};

const movieReducer = createReducer(
    initialState,
    on(moviesLoaded, (state, data) => ({ ...state, list: data.list }))
);

export const reducer = (
    state: MovieState | undefined,
    action: Action
): MovieState => movieReducer(state, action);
