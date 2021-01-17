import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { MediaService } from '../../services/media.service';
import {
    fetchPopularMovies,
    popularMoviesLoaded,
} from './popular-movies.actions';

@Injectable()
export class PopularMoviesEffects {
    public loadingPopularMovies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchPopularMovies),
            mergeMap((media) =>
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

    public constructor(
        private actions$: Actions,
        private mediaService: MediaService
    ) {}
}
