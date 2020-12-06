import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../store/state';
import { selectTrending } from '../../../store/trending/trending.reducer';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MovieListResult } from '../../../interfaces/movie-list-result';
import { MediaService } from '../../../services/media.service';
import { MediaType } from '../../../interfaces/media-type';
import * as Plyr from 'plyr';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
    public trending$: Observable<MovieListResult>;
    public playVideo: boolean;

    constructor(
        private store: Store<State>,
        private mediaService: MediaService
    ) {}
    public videoSources: Plyr.Source[];

    public ngOnInit(): void {
        this.trending$ = this.store
            .select(selectTrending)
            .pipe(map((trending) => trending[1]));
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
        this.mediaService
            .getVideo(id, MediaType.movie)
            .subscribe((videoData) => {
                this.videoSources = videoData.results.map((result) => ({
                    provider: 'youtube',
                    src: `https://youtube.com/watch?v=${result.key}`,
                }));
                this.playVideo = true;
            });
    }

    public closePlayer(): void {
        this.playVideo = false;
    }
}
