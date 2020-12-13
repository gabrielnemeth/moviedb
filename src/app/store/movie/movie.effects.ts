import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { MediaService } from '../../services/media.service';
import { movieSearch, moviesLoaded } from './movie.actions';

@Injectable()
export class MovieEffects {
    public searchMovies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(movieSearch),
            mergeMap((action) =>
                this.mediaService.getMovieSearchResult(action.query).pipe(
                    map((media) =>
                        moviesLoaded({
                            list: media,
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
