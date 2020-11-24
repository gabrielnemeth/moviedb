import { Action, createReducer, on } from '@ngrx/store';
import { State } from '../state';
import { Movie } from './movie';
import { moviesLoaded } from './movie.actions';

export interface MovieState {
  list: Movie[];
}

const initialState: MovieState = {
  list: [],
};

const movieReducer = createReducer(
  initialState,
  on(moviesLoaded, (state, data) => ({ ...state, list: data.list }))
);

export function reducer(state: MovieState | undefined, action: Action) {
  return movieReducer(state, action);
}

export const selectMovies = (state: State): Movie[] => state.movies.list;
