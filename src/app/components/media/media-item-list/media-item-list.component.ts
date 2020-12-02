import { Component, Input } from '@angular/core';
import { MovieListResult } from '../../../interfaces/movie-list-result';

@Component({
  selector: 'app-media-item-list',
  templateUrl: './media-item-list.component.html',
})
export class MediaItemListComponent {
  @Input()
  public mediaItems: MovieListResult[];
}
