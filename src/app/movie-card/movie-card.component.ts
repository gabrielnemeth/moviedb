import { Component, Input } from '@angular/core';
import { Movie } from './../movie';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  @Input()
  public movie: Movie;
}
