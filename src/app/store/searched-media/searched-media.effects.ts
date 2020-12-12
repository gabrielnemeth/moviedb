import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { MediaService } from '../../services/media.service';
import { mediaSearch, searchedMediaLoaded } from './searched-media.actions';

@Injectable()
export class SearchedMediaEffects {
    public searchMedia$ = createEffect(() =>
        this.actions$.pipe(
            ofType(mediaSearch),
            mergeMap((action) =>
                this.mediaService.getMultiSearchResult(action.query).pipe(
                    map((media) =>
                        searchedMediaLoaded({
                            list: media,
                        })
                    )
                )
            )
        )
    );

    public constructor(
        private actions$: Actions,
        private mediaService: MediaService
    ) {}
}
