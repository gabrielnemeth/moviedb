import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { MovieListResult } from '../../interfaces/movie-list-result';
import { State } from './../../store/state';
import {
    selectSelectedMediaType,
    selectTrendingMovies,
    selectTrendingTvs,
} from './../../store/trending/trending.reducer';
import { MediaType } from '../../interfaces/media-type';
import {
    fetchTrendingMovies,
    fetchTrendingTvs,
    setSelectedMediaType,
} from '../../store/trending/trending.actions';
import { filter, switchMap } from 'rxjs/operators';
import { TvListResult } from '../../interfaces/tv-list-result';
import { isNil } from 'lodash-es';

@Component({
    selector: 'app-trending',
    templateUrl: './trending.component.html',
})
export class TrendingComponent {
    public selectedMediaType$: Observable<MediaType | null> = this.store.select(
        selectSelectedMediaType
    );

    public mediaItems$: Observable<
        MovieListResult[] | TvListResult[]
    > = this.selectedMediaType$.pipe(
        filter((mediaType) => !isNil(mediaType)),
        switchMap((mediaType) => {
            if (mediaType === MediaType.movie) {
                return this.store.select(selectTrendingMovies);
            }

            if (mediaType === MediaType.tv) {
                return this.store.select(selectTrendingTvs);
            }

            return of([] as MovieListResult[]);
        })
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
}
