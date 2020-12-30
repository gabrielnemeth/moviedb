import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MediaService } from '../../../../services/media.service';
import { MediaItem } from '../../../../interfaces/media-item';

@Component({
    selector: 'app-tv-detail',
    templateUrl: './tv-detail.component.html',
})
export class TvDetailComponent implements OnInit {
    public mediaItem$: Observable<MediaItem>;

    public constructor(
        private route: ActivatedRoute,
        private mediaService: MediaService
    ) {}

    public ngOnInit(): void {
        const mediaItemId = this.route.snapshot.paramMap.get('id') || '';
        this.mediaItem$ = this.mediaService.getTvById(mediaItemId);
    }
}
