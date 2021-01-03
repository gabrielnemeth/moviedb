import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { MediaService } from '../../services/media.service';
import { featuredMediaLoaded, fetchFeaturedMedia } from './featured.actions';

@Injectable()
export class FeaturedEffects {
    public loadingFeaturedMedia$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchFeaturedMedia),
            mergeMap((media) =>
                this.mediaService.getFeaturedMedia().pipe(
                    map((mediaList) =>
                        featuredMediaLoaded({
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
