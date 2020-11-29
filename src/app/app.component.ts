import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MovieListResult } from './interfaces/movie-list-result';
import { fetchGenres } from './store/genre/genre.actions';
import { movieSearch } from './store/movie/movie.actions';
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
  public searchForm: FormGroup = new FormGroup({
    query: new FormControl('', Validators.required),
  });

  public constructor(private store: Store<State>, private router: Router) {}

  public ngOnInit(): void {
    this.store.dispatch(fetchTrending());
    this.store.dispatch(fetchGenres());
  }

  public searchForMovies(): void {
    this.store.dispatch(movieSearch({ query: this.searchForm.value.query }));
    this.router.navigate(['search']);
  }
}
