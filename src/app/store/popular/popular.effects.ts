import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { MediaService } from '../../services/media.service';
import { fetchPopularMedia, popularMediaLoaded } from './popular.actions';

@Injectable()
export class PopularEffects {
    public loadingPopularMedia$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchPopularMedia),
            mergeMap((media) =>
                this.mediaService.getPopularMedia().pipe(
                    map((mediaList) =>
                        popularMediaLoaded({
                            list: mediaList,
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
