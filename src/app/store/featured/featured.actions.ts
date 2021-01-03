import { createAction, props } from '@ngrx/store';
import { MediaListItem } from '../../interfaces/media-list-item';

export const fetchFeaturedMedia = createAction(
    '[Home Hero Component] Initiating Featured Media Fetch'
);

export const featuredMediaLoaded = createAction(
    '[Movies API] Featured Media Loaded Success',
    props<{ list: MediaListItem[] }>()
);
