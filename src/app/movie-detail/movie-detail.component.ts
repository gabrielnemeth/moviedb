import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MovieService } from './../movie.service';
import { MovieDetail } from './../store/movie/movie.detail';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  public movie$: Observable<MovieDetail>;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id') || '';
    this.movie$ = this.movieService.getMovieById(movieId);
  }

  public getStyle(
    imagePath: string | null
  ): {
    [klass: string]: any;
  } {
    return {
      'background-image': `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${imagePath})`,
      'background-size': 'cover',
      'background-repeat': 'no-repeat',
      'background-color': 'black',
    };
  }

  public getYear(date: string): string {
    return new Date(date).getFullYear().toString();
  }
}
