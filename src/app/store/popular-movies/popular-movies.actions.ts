import { createAction, props } from '@ngrx/store';
import { MediaListItem } from '../../interfaces/media-list-item';

export const fetchPopularMovies = createAction(
    '[Popular Movies] Initiating Popular Movies Fetch'
);

export const popularMoviesLoaded = createAction(
    '[Movies API] Popular Movies Loaded Success',
    props<{ list: MediaListItem[] }>()
);
