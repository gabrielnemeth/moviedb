import { Action, createReducer, on } from '@ngrx/store';
import { State } from '../state';
import { MediaListItem } from '../../interfaces/media-list-item';
import { popularMoviesLoaded } from './popular-movies.actions';

export interface PopularMoviesState {
    list: MediaListItem[];
}

const initialState: PopularMoviesState = {
    list: [],
};

const popularMoviesReducer = createReducer(
    initialState,
    on(popularMoviesLoaded, (state, data) => ({
        ...state,
        list: [...data.list],
    }))
);
export const reducer = (
    state: PopularMoviesState | undefined,
    action: Action
): PopularMoviesState => popularMoviesReducer(state, action);

export const selectPopularMovies = (state: State): MediaListItem[] =>
    state.popular.list;
