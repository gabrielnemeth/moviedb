import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Movie } from '../store/movie/movie';
import { State } from '../store/state';
import { selectTrending } from '../store/trending/trending.reducer';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
})
export class TrendingComponent {
  public movies$: Observable<Movie[]> = this.store.select(selectTrending);

  public constructor(private store: Store<State>) {}
}
