import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fetchGenres } from './store/genre/genre.actions';
import { Movie } from './store/movie/movie';
import { movieSearch } from './store/movie/movie.actions';
import { selectMovies } from './store/movie/movie.reducer';
import { State } from './store/state';
import { fetchTrending as fetchTrending } from './store/trending/trending.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public movies$: Observable<Movie[]> = this.store.select(selectMovies);
  public searchForm: FormGroup = new FormGroup({
    query: new FormControl(''),
  });

  public constructor(private store: Store<State>) {}

  public ngOnInit(): void {
    this.store.dispatch(fetchTrending());
    this.store.dispatch(fetchGenres());
  }

  public searchForMovies(): void {
    this.store.dispatch(movieSearch({ query: this.searchForm.value.query }));
  }
}
