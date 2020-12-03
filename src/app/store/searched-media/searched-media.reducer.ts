import { Action, createReducer, on } from '@ngrx/store';
import { MediaListResult } from 'src/app/interfaces/media-list-result';
import { State } from '../state';
import { searchedMediaLoaded } from './searched-media.actions';

/*

the state should be
list: {
  movie: [],
  tv: [],
  person: []
}

*/

export interface SearchedMediaState {
  list: MediaListResult[];
}

const initialState: SearchedMediaState = {
  list: [],
};

const movieReducer = createReducer(
  initialState,
  on(searchedMediaLoaded, (state, data) => ({ ...state, list: data.list }))
);

export function reducer(state: SearchedMediaState | undefined, action: Action) {
  return movieReducer(state, action);
}

export const selectSearchedMedia = (state: State): MediaListResult[] =>
  state.searchResult.list;
