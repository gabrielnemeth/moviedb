import { Action, createReducer, on } from '@ngrx/store';
import { MovieListResult } from '../../interfaces/movie-list-result';
import { moviesLoaded } from './movie.actions';

export interface MovieState {
    list: MovieListResult[];
}

const initialState: MovieState = {
    list: [],
};

const movieReducer = createReducer(
    initialState,
    on(moviesLoaded, (state, data) => ({ ...state, list: data.list }))
);

export function reducer(
    state: MovieState | undefined,
    action: Action
): MovieState {
    return movieReducer(state, action);
}
