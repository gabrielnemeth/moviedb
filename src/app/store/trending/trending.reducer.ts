import { Action, createReducer, on } from '@ngrx/store';
import { MovieListResult } from '../../interfaces/movie-list-result';
import { MovieState } from '../movie/movie.reducer';
import { State } from '../state';
import { trendingLoaded } from './trending.actions';

export interface TrendingState {
  list: MovieListResult[];
}

const initialState: TrendingState = {
  list: [],
};

const trendingReducer = createReducer(
  initialState,
  on(trendingLoaded, (state, data) => ({ ...state, list: data.list }))
);

export function reducer(state: MovieState | undefined, action: Action) {
  return trendingReducer(state, action);
}

export const selectTrending = (state: State): MovieListResult[] =>
  state.trending.list;
