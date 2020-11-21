import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { movieSearch } from './store/movie.actions';
import { selectMovies } from './store/movie.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public movies$: Observable<any> = this.store.select(selectMovies);

  public constructor(private store: Store<any>) {}

  public searchForMovies(query: string): void {
    this.store.dispatch(movieSearch({ query: query }));
  }
}
