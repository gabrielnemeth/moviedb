import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MovieListResult } from '../../interfaces/movie-list-result';
import { selectMovies } from '../../store/movie/movie.reducer';
import { State } from '../../store/state';

@Component({
  selector: 'app-search',
  templateUrl: './search-result.component.html',
})
export class SearchResultComponent {
  public movies$: Observable<MovieListResult[]> = this.store.select(
    selectMovies
  );

  public constructor(private store: Store<State>) {}
}
