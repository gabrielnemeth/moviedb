import { Component, Input } from '@angular/core';
import { Movie } from './../movie';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
})
export class MovieCardComponent {
  @Input()
  public movie: Movie;
}
