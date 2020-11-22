import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  public searchForm: FormGroup = new FormGroup({
    query: new FormControl(''),
  });

  public constructor(private store: Store<any>) {}

  public searchForMovies(): void {
    this.store.dispatch(movieSearch({ query: this.searchForm.value.query }));
  }
}
