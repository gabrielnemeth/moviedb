import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectSearchedMedia } from 'src/app/store/searched-media/searched-media.reducer';
import { State } from '../../store/state';
import { MediaListItem } from '../../interfaces/media-list-item';

@Component({
    selector: 'app-search',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent {
    public mediaItems$: Observable<MediaListItem[]> = this.store.select(
        selectSearchedMedia
    );

    public constructor(private store: Store<State>) {}
}
