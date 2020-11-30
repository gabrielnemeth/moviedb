import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MovieListResult } from './interfaces/movie-list-result';
import { fetchGenres } from './store/genre/genre.actions';
import { State } from './store/state';
import { fetchTrending as fetchTrending } from './store/trending/trending.actions';
import { selectTrending } from './store/trending/trending.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public movies$: Observable<MovieListResult[]> = this.store.select(
    selectTrending
  );

  public constructor(private store: Store<State>) {}

  public ngOnInit(): void {
    this.store.dispatch(fetchTrending());
    this.store.dispatch(fetchGenres());
  }
}
