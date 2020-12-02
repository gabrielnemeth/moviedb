import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { State } from 'src/app/store/state';
import { MovieListResult } from '../../../interfaces/movie-list-result';
import { getGenreById } from '../../../store/genre/genre.reducer';

@Component({
  selector: 'app-media-item-card',
  templateUrl: './media-item-card.component.html',
  styleUrls: ['./media-item-card.component.scss'],
})
export class MediaItemCardComponent {
  @Input()
  public mediaItem: MovieListResult;

  public constructor(private store: Store<State>, private router: Router) {}

  public getGenreString(ids: number[]): Observable<string | undefined> {
    // Return only first if there are more genres for the movie.
    const firstId = ids.slice(0, 1);
    return firstId.length > 0
      ? this.store
          .select(getGenreById, { id: firstId[0] })
          .pipe(map((g) => g?.name))
      : of(undefined);
  }

  public getYear(date: string): string {
    return new Date(date).getFullYear().toString();
  }

  public showMediaItem(id: number): void {
    this.router.navigate(['/movie', id]);
  }
}
