import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MediaService } from '../../../../services/media.service';
import { MediaItem } from '../../../../interfaces/media-item';
import { map, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-movie-detail',
    templateUrl: './movie-detail.component.html',
})
export class MovieDetailComponent implements OnInit {
    public mediaItem$: Observable<MediaItem>;

    public constructor(
        private route: ActivatedRoute,
        private mediaService: MediaService
    ) {}

    public ngOnInit(): void {
        this.mediaItem$ = this.route.params.pipe(
            map((param) => param.id),
            switchMap((id) => this.mediaService.getMovieById(id))
        );
    }
}
