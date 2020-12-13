import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaService } from '../../../services/media.service';
import { MediaItem } from '../../../interfaces/media-item';

@Component({
    selector: 'app-media-detail',
    templateUrl: './media-detail.component.html',
    styleUrls: ['./media-detail.component.scss'],
})
export class MediaDetailComponent {
    @Input()
    public mediaItem: MediaItem | null;

    constructor(
        private route: ActivatedRoute,
        private mediaService: MediaService
    ) {}

    public getStyle(
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

    public getYear(date: string | undefined): string {
        return date ? new Date(date).getFullYear().toString() : '';
    }
}
