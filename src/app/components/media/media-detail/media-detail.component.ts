import { Component, Input } from '@angular/core';
import * as moment from 'moment';
import { MediaItem } from '../../../interfaces/media-item';
import { isNil } from 'lodash-es';

@Component({
    selector: 'app-media-detail',
    templateUrl: './media-detail.component.html',
    styleUrls: ['./media-detail.component.scss'],
})
export class MediaDetailComponent {
    @Input()
    public mediaItem: MediaItem | null;

    public youtubeId: string;
    public openModal: boolean;

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

    public formatRuntime(runtime: number | undefined): string {
        console.assert(!isNil(runtime), `Runtime can't be undefined.`);
        const hours = moment.duration(runtime, 'minutes').hours();
        const minutes = moment.duration(runtime, 'minutes').minutes();

        if (hours <= 0) {
            return `${minutes}m`;
        }

        return `${hours}h ${minutes}m`;
    }

    public playVideo(youtubeId: string | undefined): void {
        if (isNil(youtubeId)) {
            return;
        }
        this.youtubeId = youtubeId;
        this.openModal = true;
    }

    public closePlayer(): void {
        this.openModal = false;
    }
}
