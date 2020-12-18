import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MediaService } from '../../../../services/media.service';
import { MediaItem } from '../../../../interfaces/media-item';

@Component({
    selector: 'app-person-detail',
    templateUrl: './person-detail.component.html',
})
export class PersonDetailComponent implements OnInit {
    public mediaItem$: Observable<MediaItem>;

    constructor(
        private route: ActivatedRoute,
        private mediaService: MediaService
    ) {}

    ngOnInit(): void {
        const mediaItemId = this.route.snapshot.paramMap.get('id') || '';
        this.mediaItem$ = this.mediaService.getPersonById(mediaItemId);
    }
}
