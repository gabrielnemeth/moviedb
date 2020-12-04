import { createAction, props } from '@ngrx/store';
import { MediaListResult } from 'src/app/interfaces/media-list-result';
import { SearchType } from './../../interfaces/search-type';

export const SEARCH_MEDIA_LOADED_SUCCESS =
    '[Movies API] Searched Media Loaded Success';

export const mediaSearch = createAction(
    '[Movie Page] Search Media',
    props<{ query: string; search_type: SearchType }>()
);

export const searchedMediaLoaded = createAction(
    SEARCH_MEDIA_LOADED_SUCCESS,
    props<{ list: MediaListResult[] }>()
);
