import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../../store/state';
import {
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
import { map } from 'rxjs/operators';
import { shuffle, take } from 'lodash-es';

@Component({
    selector: 'app-trending',
    templateUrl: './trending.component.html',
})
export class TrendingComponent implements OnInit {
    public selectedTimeWindow$: Observable<TimeWindow | null> = this.store.select(
        selectTimeWindow
    );

    private mediaItems$: Observable<MediaListItem[]> = this.store.select(
        selectTrendingMedia
    );

    private shuffledMediaItems$: Observable<
        MediaListItem[]
    > = this.mediaItems$.pipe(map((mediaItems) => shuffle(mediaItems)));

    public firstMediaItems$: Observable<
        MediaListItem[]
    > = this.shuffledMediaItems$.pipe(
        map((mediaItems) => take(mediaItems, 15))
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
