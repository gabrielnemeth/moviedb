import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../store/state';
import { filter, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MovieListResult } from '../../../interfaces/movie-list-result';
import { MediaService } from '../../../services/media.service';
import { MediaType } from '../../../interfaces/media-type';
import { getGenresByIds } from '../../../store/genre/genre.reducer';
import { Genre } from '../../../interfaces/genre';
import { selectTrendingMovies } from 'src/app/store/trending/trending.reducer';
import { isNil } from 'lodash-es';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
    public trending$: Observable<MovieListResult>;
    public youtubeId$: Observable<string | undefined>;
    public youtubeId: string;
    public openModal: boolean;
    public genres$: Observable<(Genre | undefined)[]>;

    constructor(
        private store: Store<State>,
        private mediaService: MediaService
    ) {}

    public ngOnInit(): void {
        this.trending$ = this.store.select(selectTrendingMovies).pipe(
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

        this.genres$ = this.trending$.pipe(
            switchMap((trending) =>
                this.store.select(getGenresByIds, {
                    ids: trending.genre_ids,
                })
            )
        );
    }

    public getStyle(
        imagePath: string | null
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
