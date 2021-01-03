import { Action, createReducer, on } from '@ngrx/store';
import { State } from '../state';
import { featuredMediaLoaded } from './featured.actions';
import { MediaListItem } from '../../interfaces/media-list-item';

export interface FeaturedState {
    list: MediaListItem[];
}

const initialState: FeaturedState = {
    list: [],
};

const featuredReducer = createReducer(
    initialState,
    on(featuredMediaLoaded, (state, data) => ({
        ...state,
        list: [...data.list],
    }))
);
export const reducer = (
    state: FeaturedState | undefined,
    action: Action
): FeaturedState => featuredReducer(state, action);

export const selectFeaturedMedia = (state: State): MediaListItem[] =>
    state.featured.list;
