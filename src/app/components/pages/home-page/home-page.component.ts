import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../store/state';
import { selectTrending } from '../../../store/trending/trending.reducer';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MovieListResult } from '../../../interfaces/movie-list-result';
import { MediaService } from '../../../services/media.service';
import { MediaType } from '../../../interfaces/media-type';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
    public trending$: Observable<MovieListResult>;
    public videoId: string;
    public playVideo: boolean;

    constructor(
        private store: Store<State>,
        private mediaService: MediaService
    ) {}

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
                this.playVideo = true;
                this.videoId = videoData.results[0].key;
            });
    }
}
