import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../store/state';
import { selectTrending } from '../../../store/trending/trending.reducer';
import { map, mapTo, switchMap } from 'rxjs/operators';
import { merge, Observable, of, Subject } from 'rxjs';
import { MovieListResult } from '../../../interfaces/movie-list-result';
import { MediaService } from '../../../services/media.service';
import { MediaType } from '../../../interfaces/media-type';
import { isNil } from 'lodash-es';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
    public trending$: Observable<MovieListResult>;

    constructor(
        private store: Store<State>,
        private mediaService: MediaService
    ) {}

    public videoId$: Subject<number> = new Subject<number>();
    public closeVideoModal$: Subject<void> = new Subject<void>();
    public youtubeId$: Observable<string | undefined>;

    public ngOnInit(): void {
        this.trending$ = this.store
            .select(selectTrending)
            .pipe(map((trending) => trending[1]));

        this.youtubeId$ = merge(
            this.closeVideoModal$.pipe(mapTo(undefined)),
            this.videoId$
        ).pipe(
            switchMap((id) =>
                isNil(id)
                    ? of(undefined)
                    : this.mediaService
                          .getVideo(id, MediaType.movie)
                          .pipe(map((videoData) => videoData.results[0].key))
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

    public getVid(id: number): void {
        this.videoId$.next(id);
    }

    public closePlayer(): void {
        this.closeVideoModal$.next();
    }
}
