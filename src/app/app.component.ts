import { Component } from '@angular/core';
import { Movie } from './movie';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public movies: Movie[] = [];

  public constructor(private movieService: MovieService) {}

  public searchForMovies(querry: string): void {
    this.movieService.getResult(querry).subscribe((data) => {
      console.log(data);
      this.movies = data.results;
    });
  }
}
