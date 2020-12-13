import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { MediaService } from '../../services/media.service';
import { fetchTrendingMedia, trendingMediaLoaded } from './trending.actions';
import { State } from '../state';
import { Store } from '@ngrx/store';
import { zip } from 'rxjs';

@Injectable()
export class TrendingEffects {
    public loadingTrendingMedia$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchTrendingMedia),
            mergeMap((media) => {
                return zip(
                    this.movieService.getTrendingMovies(),
                    this.movieService.getTrendingTvs()
                ).pipe(
                    map(([tvList, movieList]) =>
                        trendingMediaLoaded({
                            list: [...tvList, ...movieList],
                        })
                    )
                );
            })
        )
    );

    public constructor(
        private actions$: Actions,
        private movieService: MediaService,
        private store: Store<State>
    ) {}
}
