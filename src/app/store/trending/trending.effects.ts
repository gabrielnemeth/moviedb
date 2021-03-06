import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { MediaService } from '../../services/media.service';
import { fetchTrendingMedia, trendingMediaLoaded } from './trending.actions';

@Injectable()
export class TrendingEffects {
    public loadingTrendingMedia$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchTrendingMedia),
            mergeMap((media) =>
                this.mediaService.getTrendingMediaForCurrentTimeWindow().pipe(
                    map((mediaList) =>
                        trendingMediaLoaded({
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
