import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../store/state';
import { filter, map, shareReplay, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MediaService } from '../../../services/media.service';
import { Genre } from '../../../interfaces/genre';
import { isNil, random } from 'lodash-es';
import { MediaListItem } from '../../../interfaces/media-list-item';
import { getGenresByIds } from '../../../store/genre/genre.reducer';
import { selectFeaturedMedia } from '../../../store/featured/featured.reducer';
import { fetchFeaturedMedia } from '../../../store/featured/featured.actions';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
    public featured$: Observable<MediaListItem>;
    public youtubeId$: Observable<string | undefined>;
    public youtubeId: string;
    public openModal: boolean;
    public genres$: Observable<(Genre | undefined)[]>;
    public style$: Observable<{
        [klass: string]: string;
    }>;

    public constructor(
        private store: Store<State>,
        private mediaService: MediaService
    ) {}

    public ngOnInit(): void {
        this.store.dispatch(fetchFeaturedMedia());

        this.featured$ = this.store.select(selectFeaturedMedia).pipe(
            map((featured) => featured[random(0, featured.length - 1)]),
            filter((featured) => !isNil(featured)),
            shareReplay(1)
        );

        this.style$ = this.featured$.pipe(
            map((trending) => this.getStyle(trending.img?.backdrop))
        );

        this.youtubeId$ = this.featured$.pipe(
            switchMap((trending) =>
                this.mediaService
                    .getVideo(trending.id, trending.type)
                    .pipe(map((videoData) => videoData.results[0]?.key))
            )
        );

        const trendingGenreIds$ = this.featured$.pipe(
            filter(
                (trending) => !isNil(trending) && !isNil(trending.genresIds)
            ),
            map((trending) => ({
                ids: trending.genresIds as number[],
                type: trending.type,
            }))
        );

        this.genres$ = trendingGenreIds$.pipe(
            switchMap((data) =>
                this.store.select(getGenresByIds, {
                    ids: data.ids,
                    mediaType: data.type,
                })
            )
        );
    }

    private getStyle(
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
