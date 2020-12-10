import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { MediaType } from 'src/app/interfaces/media-type';
import { MediaService } from '../../services/media.service';
import {
    fetchTrendingMovies,
    fetchTrendingTvs,
    trendingMoviesLoaded,
    trendingTvsLoaded,
} from './trending.actions';

@Injectable()
export class TrendingEffects {
    public loadTrendingMovies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchTrendingMovies),
            mergeMap((_) =>
                this.movieService.getTrendingMovies().pipe(
                    map((result) =>
                        trendingMoviesLoaded({
                            movies: result.results.map((res) => ({
                                ...res,
                                media_type: MediaType.movie,
                            })),
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
                    map((result) =>
                        trendingTvsLoaded({
                            tv: result.results.map((res) => ({
                                ...res,
                                media_type: MediaType.tv,
                            })),
                        })
                    )
                )
            )
        )
    );

    public constructor(
        private actions$: Actions,
        private movieService: MediaService
    ) {}
}
