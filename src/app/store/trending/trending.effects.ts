import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { MediaType } from 'src/app/interfaces/media-type';
import { MediaService } from '../../services/media.service';
import { fetchTrending, trendingLoaded } from './trending.actions';

@Injectable()
export class TrendingEffects {
  public loadTrending$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchTrending),
      mergeMap((_) =>
        this.movieService
          .getTrending()
          .pipe(
            map((result) =>
              trendingLoaded({
                list: result.results.map((res) => ({
                  ...res,
                  media_type: MediaType.movie,
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
