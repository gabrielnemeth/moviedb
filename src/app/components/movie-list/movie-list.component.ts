import { Component, Input } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { MovieListResult } from '../../interfaces/movie-list-result';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
})
export class MovieListComponent {
  @Input()
  public movies: MovieListResult[];

  public config: SwiperConfigInterface = {
    slidesPerView: 8,
    navigation: true,
    spaceBetween: 20,
  };
}
