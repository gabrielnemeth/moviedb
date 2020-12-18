import { createAction, props } from '@ngrx/store';
import { SearchType } from './../../interfaces/search-type';
import { MediaListItem } from '../../interfaces/media-list-item';

export const SEARCH_MEDIA_LOADED_SUCCESS =
    '[Movies API] Searched Media Loaded Success';

export const mediaSearch = createAction(
    '[Movie Page] Search Media',
    props<{ query: string; search_type: SearchType }>()
);

export const searchedMediaLoaded = createAction(
    SEARCH_MEDIA_LOADED_SUCCESS,
    props<{ list: MediaListItem[] }>()
);
