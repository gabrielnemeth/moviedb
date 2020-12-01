import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Movie } from './../../../interfaces/movie';
import { MovieService } from './../../../services/movie.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
})
export class ItemDetailComponent implements OnInit {
  public movie$: Observable<Movie>;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id') || '';
    this.movie$ = this.movieService.getMovieById(itemId);
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
