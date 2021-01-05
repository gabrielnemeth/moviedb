import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../../store/state';
import { MediaType } from '../../interfaces/media-type';
import { MediaListItem } from '../../interfaces/media-list-item';
import { map, switchMap } from 'rxjs/operators';
import { shuffle, take } from 'lodash-es';
import {
    fetchPopularMedia,
    setSelectedMediaType,
} from '../../store/popular/popular.actions';
import {
    selectPopularMedia,
    selectSelectedMediaType,
} from '../../store/popular/popular.reducer';

@Component({
    selector: 'app-popular',
    templateUrl: './popular.component.html',
})
export class PopularComponent implements OnInit {
    public selectedMediaType$: Observable<MediaType> = this.store.select(
        selectSelectedMediaType
    );

    private mediaItems$: Observable<
        MediaListItem[]
    > = this.selectedMediaType$.pipe(
        switchMap((selectedType) =>
            this.store
                .select(selectPopularMedia)
                .pipe(
                    map((media) => media.filter((m) => m.type === selectedType))
                )
        )
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

    public ngOnInit(): void {
        this.store.dispatch(fetchPopularMedia());
    }
}
