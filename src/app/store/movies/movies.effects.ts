import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { MediaService } from '../../services/media.service';
import {
    fetchNowPlayingMovies,
    fetchPopularMovies,
    fetchTopRatedMovies,
    fetchUpcomingMovies,
    nowPlayingMoviesLoaded,
    popularMoviesLoaded,
    topRatedMoviesLoaded,
    upcomingMoviesLoaded,
} from './movies.actions';

@Injectable()
export class MoviesEffects {
    public loadingPopularMovies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchPopularMovies),
            mergeMap(() =>
                this.mediaService.getPopularMovies().pipe(
                    map((mediaList) =>
                        popularMoviesLoaded({
                            list: mediaList,
                        })
                    )
                )
            )
        )
    );

    public loadingNowPlayingMovies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchNowPlayingMovies),
            mergeMap(() =>
                this.mediaService.getNowPlayingMovies().pipe(
                    map((mediaList) =>
                        nowPlayingMoviesLoaded({
                            list: mediaList,
                        })
                    )
                )
            )
        )
    );

    public loadingUpcomingMovies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchUpcomingMovies),
            mergeMap(() =>
                this.mediaService.getUpcomingMovies().pipe(
                    map((mediaList) =>
                        upcomingMoviesLoaded({
                            list: mediaList,
                        })
                    )
                )
            )
        )
    );

    public loadingTopRatedMovies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchTopRatedMovies),
            mergeMap(() =>
                this.mediaService.getTopRatedMovies().pipe(
                    map((mediaList) =>
                        topRatedMoviesLoaded({
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
