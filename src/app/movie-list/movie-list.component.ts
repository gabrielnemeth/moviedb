import { Component, Input } from '@angular/core';
import { Movie } from '../store/movie/movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
})
export class MovieListComponent {
  @Input()
  public movies: Movie[];
}
