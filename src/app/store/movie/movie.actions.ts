import { createAction, props } from '@ngrx/store';
import { MediaListItem } from '../../interfaces/media-list-item';

export const movieSearch = createAction(
    '[Movie Page] Search Movies',
    props<{ query: string }>()
);

export const moviesLoaded = createAction(
    '[Movies API] Movies Loaded Success',
    props<{ list: MediaListItem[] }>()
);
