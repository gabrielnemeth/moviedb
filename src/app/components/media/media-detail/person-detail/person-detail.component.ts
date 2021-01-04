import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MediaService } from '../../../../services/media.service';
import { MediaItem } from '../../../../interfaces/media-item';
import { map, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-person-detail',
    templateUrl: './person-detail.component.html',
})
export class PersonDetailComponent implements OnInit {
    public mediaItem$: Observable<MediaItem>;

    public constructor(
        private route: ActivatedRoute,
        private mediaService: MediaService
    ) {}

    public ngOnInit(): void {
        this.mediaItem$ = this.route.params.pipe(
            map((param) => param.id),
            switchMap((id) => this.mediaService.getPersonById(id))
        );
    }
}
