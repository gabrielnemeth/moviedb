import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { MediaService } from '../../services/media.service';
import { fetchGenres, genresLoaded } from './genre.actions';

@Injectable()
export class GenreEffects {
  public getGenres$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchGenres),
      mergeMap((_) =>
        this.movieService
          .getGenres()
          .pipe(map((result) => genresLoaded({ list: result })))
      )
    )
  );

  public constructor(
    private actions$: Actions,
    private movieService: MediaService
  ) {}
}
