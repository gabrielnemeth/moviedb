import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { movieSearch } from './../../store/movie/movie.actions';
import { State } from './../../store/state';

@Component({
  selector: 'app-search-form',
  templateUrl: 'search-form.component.html',
})
export class SearchFormComponent {
  public searchForm: FormGroup = new FormGroup({
    query: new FormControl('', Validators.required),
  });

  public constructor(private store: Store<State>, private router: Router) {}

  public searchForMovies(): void {
    this.store.dispatch(movieSearch({ query: this.searchForm.value.query }));
    this.router.navigate(['search']);
  }
}
