import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from './../../store/state';
import {
    selectSelectedMediaType,
    selectTrendingMedia,
} from './../../store/trending/trending.reducer';
import { MediaType } from '../../interfaces/media-type';
import {
    fetchTrendingMedia,
    fetchTrendingMovies,
    fetchTrendingTvs,
    setSelectedMediaType,
} from '../../store/trending/trending.actions';
import { MediaListItem } from '../../interfaces/media-list-item';

@Component({
    selector: 'app-trending',
    templateUrl: './trending.component.html',
})
export class TrendingComponent implements OnInit {
    public selectedMediaType$: Observable<MediaType | null> = this.store.select(
        selectSelectedMediaType
    );

    public mediaItems$: Observable<MediaListItem[]> = this.store.select(
        selectTrendingMedia
    );

    public constructor(private store: Store<State>) {}

    public onMediaTypeSelect(mediaType: MediaType): void {
        this.store.dispatch(
            setSelectedMediaType({ selectedMediaType: mediaType })
        );
        if (mediaType === MediaType.movie) {
            this.store.dispatch(fetchTrendingMovies());
        }
        if (mediaType === MediaType.tv) {
            this.store.dispatch(fetchTrendingTvs());
        }
    }

    public ngOnInit(): void {
        this.store.dispatch(fetchTrendingMedia());
    }
}
