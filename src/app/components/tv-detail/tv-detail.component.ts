import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MediaService } from '../../services/media.service';
import { Tv } from '../../interfaces/tv';

@Component({
    selector: 'app-tv-detail',
    templateUrl: './tv-detail.component.html',
    styleUrls: ['./tv-detail.component.scss'],
})
export class TvDetailComponent implements OnInit {
    public mediaItem$: Observable<Tv>;

    constructor(
        private route: ActivatedRoute,
        private movieService: MediaService
    ) {}

    ngOnInit(): void {
        const mediaItemId = this.route.snapshot.paramMap.get('id') || '';
        this.mediaItem$ = this.movieService.getTvById(mediaItemId);
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

    public getYear(date: string): string {
        return new Date(date).getFullYear().toString();
    }
}
