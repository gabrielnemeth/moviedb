import { createAction, props } from '@ngrx/store';
import { MediaType } from '../../interfaces/media-type';
import { MediaListItem } from '../../interfaces/media-list-item';

export const fetchPopularMedia = createAction(
    '[Popular Component] Initiating Popular Media Fetch'
);

export const popularMediaLoaded = createAction(
    '[Movies API] Popular Media Loaded Success',
    props<{ list: MediaListItem[] }>()
);

export const setSelectedMediaType = createAction(
    '[Popular Component] Popular MediaType Selected',
    props<{ selectedMediaType: MediaType }>()
);
