import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs/operators';
import { MediaType } from 'src/app/interfaces/media-type';
import { MediaService } from '../../services/media.service';
import {
    fetchTrendingMedia,
    fetchTrendingMovies,
    fetchTrendingTvs,
    trendingMoviesLoaded,
    trendingTvsLoaded,
} from './trending.actions';
import { MediaListItem } from '../../interfaces/media-list-item';
import { MovieSearchResponse } from '../../interfaces/response/movie-search-response';
import { TvSearchResponse } from '../../interfaces/response/tv-search-response';
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
                    map((result) =>
                        trendingMoviesLoaded({
                            list: this.createMediaListItemsFromMovies(result),
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
                            list: this.createMediaListItemsFromTvs(result),
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

    private createMediaListItemsFromMovies(
        movieSearchResponse: MovieSearchResponse
    ): MediaListItem[] {
        return movieSearchResponse.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            genresIds: movie.genre_ids,
            img: {
                poster: movie.poster_path,
                backdrop: movie.backdrop_path,
            },
            releaseDate: movie.release_date,
            voteAverage: movie.vote_average,
            type: MediaType.movie,
        }));
    }

    private createMediaListItemsFromTvs(
        tvSearchResponse: TvSearchResponse
    ): MediaListItem[] {
        return tvSearchResponse.results.map((tv) => ({
            id: tv.id,
            title: tv.name,
            genresIds: tv.genre_ids,
            img: {
                poster: tv.poster_path,
                backdrop: tv.backdrop_path,
            },
            releaseDate: tv.first_air_date,
            voteAverage: tv.vote_average,
            type: MediaType.tv,
        }));
    }
}
