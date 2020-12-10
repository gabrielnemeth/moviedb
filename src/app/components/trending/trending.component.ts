import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MovieListResult } from '../../interfaces/movie-list-result';
import { State } from './../../store/state';
import {
    selectSelectedMediaType,
    selectTrending,
} from './../../store/trending/trending.reducer';
import { MediaType } from '../../interfaces/media-type';
import { setSelectedMediaType } from '../../store/trending/trending.actions';

@Component({
    selector: 'app-trending',
    templateUrl: './trending.component.html',
})
export class TrendingComponent {
    public mediaItems$: Observable<MovieListResult[]> = this.store.select(
        selectTrending
    );
    public selectedMediaType$: Observable<MediaType | null> = this.store.select(
        selectSelectedMediaType
    );

    public constructor(private store: Store<State>) {}

    public onMediaTypeSelect(mediaType: MediaType): void {
        this.store.dispatch(
            setSelectedMediaType({ selectedMediaType: mediaType })
        );
    }
}
