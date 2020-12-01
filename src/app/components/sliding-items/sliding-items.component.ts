import { Component, Input } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { MovieListResult } from '../../interfaces/movie-list-result';

@Component({
  selector: 'app-sliding-items',
  templateUrl: './sliding-items.component.html',
})
export class SlidingItemsComponent {
  @Input()
  public items: MovieListResult[];

  @Input()
  public title: string;

  public config: SwiperConfigInterface = {
    navigation: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      type: 'bullets',
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      920: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 6,
        spaceBetween: 20,
      },
      1215: {
        slidesPerView: 8,
        spaceBetween: 20,
      },
    },
  };
}
