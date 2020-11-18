import { Component, Input } from '@angular/core';
import { Movie } from './../movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
})
export class MovieListComponent {
  @Input()
  public movies: Movie[];
}
