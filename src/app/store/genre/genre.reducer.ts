import { Action, createReducer, createSelector, on } from '@ngrx/store';
import { Genre } from '../../interfaces/genre';
import { State } from '../state';
import { genresLoaded } from './genre.actions';

export interface GenreState {
  list: Genre[];
}

const initialState: GenreState = {
  list: [],
};

const _genreReducer = createReducer(
  initialState,
  on(genresLoaded, (state, data) => ({ ...state, list: data.list }))
);

export function reducer(state: GenreState | undefined, action: Action) {
  return _genreReducer(state, action);
}

export const selectGenres = (state: State): Genre[] => state.genres.list;

export const getGenreById = createSelector(
  selectGenres,
  (genres: Genre[], props: { id: number }) =>
    genres?.find((g) => g.id === props.id)
);
