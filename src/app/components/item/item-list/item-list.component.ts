import { Component, Input } from '@angular/core';
import { MovieListResult } from './../../../interfaces/movie-list-result';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
})
export class ItemListComponent {
  @Input()
  public items: MovieListResult[];
}
