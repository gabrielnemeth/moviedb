import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { MovieService } from '../../services/movie.service';
import { movieSearch, moviesLoaded } from './movie.actions';

@Injectable()
export class MovieEffects {
  public searchMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(movieSearch),
      mergeMap((action) =>
        this.movieService
          .getMovieSearchResult(action.query)
          .pipe(map((result) => moviesLoaded({ list: result.results })))
      )
    )
  );

  public constructor(
    private actions$: Actions,
    private movieService: MovieService
  ) {}
}
