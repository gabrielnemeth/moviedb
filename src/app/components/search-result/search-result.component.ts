import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MediaListResult } from 'src/app/interfaces/media-list-result';
import { selectSearchedMedia } from 'src/app/store/searched-media/searched-media.reducer';
import { State } from '../../store/state';

@Component({
  selector: 'app-search',
  templateUrl: './search-result.component.html',
})
export class SearchResultComponent {
  public mediaItems$: Observable<MediaListResult[]> = this.store.select(
    selectSearchedMedia
  );

  public constructor(private store: Store<State>) {}
}
