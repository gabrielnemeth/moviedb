import { Action, createReducer, on } from '@ngrx/store';
import { State } from '../state';
import { selectMoviesFilterType } from './movies.actions';
import { MediaListItem } from '../../interfaces/media-list-item';

export interface MoviesState {
    selectedMoviesFilterType: string;
}

const initialState: MoviesState = {
    selectedMoviesFilterType: 'popular',
};

const moviesReducer = createReducer(
    initialState,
    on(selectMoviesFilterType, (state, data) => ({
        ...state,
        selectedMoviesFilterType: data.selectedMoviesFilterType,
    }))
);
export const reducer = (
    state: MoviesState | undefined,
    action: Action
): MoviesState => moviesReducer(state, action);

export const selectSelectedMoviesFilterType = (state: State): string =>
    state.movies.selectedMoviesFilterType;

export const selectMoviesByFilterType = (
    state: State
): MediaListItem[] | undefined => {
    if (state.movies.selectedMoviesFilterType === 'popular') {
        return state.popularMovies.list;
    }

    return undefined;
};
