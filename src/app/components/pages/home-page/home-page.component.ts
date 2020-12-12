import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../store/state';
import { filter, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MediaService } from '../../../services/media.service';
import { MediaType } from '../../../interfaces/media-type';
import { Genre } from '../../../interfaces/genre';
import { selectTrendingMedia } from 'src/app/store/trending/trending.reducer';
import { isNil } from 'lodash-es';
import { MediaListItem } from '../../../interfaces/media-list-item';
import { getGenresByIds } from '../../../store/genre/genre.reducer';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
    public trending$: Observable<MediaListItem>;
    public youtubeId$: Observable<string | undefined>;
    public youtubeId: string;
    public openModal: boolean;
    public genres$: Observable<(Genre | undefined)[]>;

    constructor(
        private store: Store<State>,
        private mediaService: MediaService
    ) {}

    public ngOnInit(): void {
        this.trending$ = this.store.select(selectTrendingMedia).pipe(
            map((trending) => trending[8]),
            filter((trending) => !isNil(trending))
        );

        this.youtubeId$ = this.trending$.pipe(
            switchMap((trending) =>
                this.mediaService
                    .getVideo(trending.id, MediaType.movie)
                    .pipe(map((videoData) => videoData.results[0].key))
            )
        );

        const trendingGenreIds$ = this.trending$.pipe(
            filter(
                (trending) => !isNil(trending) && !isNil(trending.genresIds)
            ),
            map((trending) => trending.genresIds as number[])
        );

        this.genres$ = trendingGenreIds$.pipe(
            switchMap((ids) =>
                this.store.select(getGenresByIds, {
                    ids,
                })
            )
        );
    }

    public getStyle(
        imagePath: string | null | undefined
    ): {
        [klass: string]: any;
    } {
        return {
            'background-image': `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${imagePath})`,
            'background-size': 'cover',
            'background-repeat': 'no-repeat',
            'background-color': 'black',
        };
    }

    public playVideo(youtubeId: string): void {
        this.youtubeId = youtubeId;
        this.openModal = true;
    }

    public closePlayer(): void {
        this.openModal = false;
    }
}
