import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs/operators';
import { MediaService } from '../../services/media.service';
import {
    fetchTrendingMedia,
    fetchTrendingMovies,
    fetchTrendingTvs,
    trendingMoviesLoaded,
    trendingTvsLoaded,
} from './trending.actions';
import { State } from '../state';
import { Store } from '@ngrx/store';

@Injectable()
export class TrendingEffects {
    public loadingTrendingMedia$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(fetchTrendingMedia),
                tap((_) => {
                    this.store.dispatch(fetchTrendingMovies());
                    this.store.dispatch(fetchTrendingTvs());
                })
            ),
        { dispatch: false }
    );

    public loadTrendingMovies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchTrendingMovies),
            mergeMap((_) =>
                this.movieService.getTrendingMovies().pipe(
                    map((media) =>
                        trendingMoviesLoaded({
                            list: media,
                        })
                    )
                )
            )
        )
    );

    public loadTrendingTvs$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchTrendingTvs),
            mergeMap((_) =>
                this.movieService.getTrendingTvs().pipe(
                    map((media) =>
                        trendingTvsLoaded({
                            list: media,
                        })
                    )
                )
            )
        )
    );

    public constructor(
        private actions$: Actions,
        private movieService: MediaService,
        private store: Store<State>
    ) {}
}
