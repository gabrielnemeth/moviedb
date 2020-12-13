import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../../store/state';
import {
    selectSelectedMediaType,
    selectTimeWindow,
    selectTrendingMedia,
} from '../../store/trending/trending.reducer';
import { MediaType } from '../../interfaces/media-type';
import {
    fetchTrendingMedia,
    setSelectedMediaType,
    setSelectedTimeWindow,
} from '../../store/trending/trending.actions';
import { MediaListItem } from '../../interfaces/media-list-item';
import { TimeWindow } from '../../interfaces/time-window';

@Component({
    selector: 'app-trending',
    templateUrl: './trending.component.html',
})
export class TrendingComponent implements OnInit {
    public selectedMediaType$: Observable<MediaType | null> = this.store.select(
        selectSelectedMediaType
    );

    public selectedTimeWindow$: Observable<TimeWindow | null> = this.store.select(
        selectTimeWindow
    );

    public mediaItems$: Observable<MediaListItem[]> = this.store.select(
        selectTrendingMedia
    );

    public constructor(private store: Store<State>) {}

    public onMediaTypeSelect(mediaType: MediaType): void {
        this.store.dispatch(
            setSelectedMediaType({ selectedMediaType: mediaType })
        );
    }

    public onTimeWindowSelect(timeWindow: TimeWindow): void {
        this.store.dispatch(
            setSelectedTimeWindow({
                selectedTimeWindow: timeWindow,
            })
        );
    }

    public ngOnInit(): void {
        this.store.dispatch(fetchTrendingMedia());
    }
}
