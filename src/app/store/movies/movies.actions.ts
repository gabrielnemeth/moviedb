import { createAction, props } from '@ngrx/store';

export const selectMoviesFilterType = createAction(
    '[Movies Page] Select Movies Filter Type',
    props<{ selectedMoviesFilterType: string }>()
);
