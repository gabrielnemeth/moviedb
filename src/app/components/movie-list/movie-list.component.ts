import { Component, Input } from '@angular/core';
import { MovieListResult } from '../../interfaces/movie-list-result';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
})
export class MovieListComponent {
  @Input()
  public movies: MovieListResult[];
}
