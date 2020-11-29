import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { MovieService } from '../../services/movie.service';
import { fetchTrending, trendingLoaded } from './trending.actions';

@Injectable()
export class TrendingEffects {
  public loadTrending$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchTrending),
      mergeMap((_) =>
        this.movieService
          .getTrending()
          .pipe(map((result) => trendingLoaded({ list: result.results })))
      )
    )
  );

  public constructor(
    private actions$: Actions,
    private movieService: MovieService
  ) {}
}
