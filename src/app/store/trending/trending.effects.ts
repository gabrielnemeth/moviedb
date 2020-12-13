import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { MediaService } from '../../services/media.service';
import {
    fetchTrendingMedia,
    fetchTrendingMovies,
    fetchTrendingTvs,
    trendingMediaLoaded,
    trendingMoviesLoaded,
    trendingTvsLoaded,
} from './trending.actions';
import { State } from '../state';
import { Store } from '@ngrx/store';
import { selectTrendingMedia } from './trending.reducer';
import { merge } from 'rxjs';

@Injectable()
export class TrendingEffects {
    public loadingTrendingMedia$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(fetchTrendingMedia),
                switchMap((_) => this.store.select(selectTrendingMedia)),
                tap((media) => {
                    if (media.length === 0) {
                        return merge([
                            this.movieService.getTrendingMovies(),
                            this.movieService.getTrendingTvs(),
                        ]).pipe(
                            switchMap((mediaListItems$) =>
                                mediaListItems$.pipe(
                                    map((mediaListItems) =>
                                        trendingMediaLoaded({
                                            list: mediaListItems,
                                        })
                                    )
                                )
                            ),
                            tap(console.log)
                        );
                    } else {
                        return media;
                    }
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
