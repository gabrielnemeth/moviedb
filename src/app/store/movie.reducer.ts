import { Action, createReducer, on } from '@ngrx/store';
import { Movie } from './../movie';
import { moviesLoaded } from './movie.actions';

export interface State {
  movies: MovieState;
}

export interface MovieState {
  list: Movie[];
}

export const initialState: MovieState = {
  list: [],
};

const movieReducer = createReducer(
  initialState,
  on(moviesLoaded, (state, data) => ({ ...state, list: data.list }))
);

export function reducer(state: MovieState | undefined, action: Action) {
  return movieReducer(state, action);
}

export const selectMovies = (state: State) => state.movies.list;
