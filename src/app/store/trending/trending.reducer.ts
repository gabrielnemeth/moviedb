import { Action, createReducer, on } from '@ngrx/store';
import { Movie } from '../movie/movie';
import { MovieState } from '../movie/movie.reducer';
import { State } from '../state';
import { trendingLoaded } from './trending.actions';

export interface TrendingState {
  list: Movie[];
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

export const selectTrending = (state: State): Movie[] => state.trending.list;
