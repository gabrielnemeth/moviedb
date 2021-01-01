import { Component, Input } from '@angular/core';
import * as moment from 'moment';
import { MediaItem } from '../../../interfaces/media-item';
import { isNil, take } from 'lodash-es';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Cast } from 'src/app/interfaces/cast';

@Component({
    selector: 'app-media-detail',
    templateUrl: './media-detail.component.html',
    styleUrls: ['./media-detail.component.scss'],
})
export class MediaDetailComponent {
    private _mediaItem: MediaItem | null;
    public style: {
        [klass: string]: string;
    };
    public year: string;
    public runtime?: string;

    @Input()
    public set mediaItem(item: MediaItem | null) {
        this._mediaItem = item;
        this.castWithProfileOnly$ = of(item).pipe(
            filter((i) => !isNil(i?.cast)),
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            map((i) => i!.cast!.filter((cast) => !isNil(cast.imagePath))),
            map((i) => take(i, 14))
        );

        this.style = this.getStyle(item?.img?.backdrop);
        this.year = this.getYear(item?.releaseDate);
        this.runtime = this.formatRuntime(item?.runtime);
    }

    public get mediaItem(): MediaItem | null {
        return this._mediaItem;
    }

    public castWithProfileOnly$: Observable<Cast[] | undefined>;

    public youtubeId: string;
    public openModal: boolean;

    public config: SwiperConfigInterface = {
        navigation: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            type: 'bullets',
        },
        breakpoints: {
            320: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            480: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            640: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            920: {
                slidesPerView: 5,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 6,
                spaceBetween: 20,
            },
            1215: {
                slidesPerView: 8,
                spaceBetween: 20,
            },
        },
    };

    public showAllReviews: boolean;

    private getStyle(
        imagePath: string | null | undefined
    ): {
        [klass: string]: string;
    } {
        return {
            'background-image': `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${imagePath})`,
            'background-size': 'cover',
            'background-repeat': 'no-repeat',
            'background-color': 'black',
        };
    }

    private getYear(date: string | undefined): string {
        return date ? new Date(date).getFullYear().toString() : '';
    }

    private formatRuntime(runtime: number | undefined): string | undefined {
        if (isNil(runtime)) {
            return runtime;
        }
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
