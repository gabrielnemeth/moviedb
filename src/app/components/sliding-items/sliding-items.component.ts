import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { MediaType } from '../../interfaces/media-type';
import { MediaListItem } from '../../interfaces/media-list-item';

@Component({
    selector: 'app-sliding-items',
    templateUrl: './sliding-items.component.html',
})
export class SlidingItemsComponent {
    @Input()
    public mediaItems: MediaListItem[];

    @Input()
    public title: string;

    @Input()
    public mediaTypeSwitcher: boolean;

    @Input()
    public selectedMediaType: MediaType | null;

    @Output()
    public mediaTypeSelect: EventEmitter<MediaType> = new EventEmitter<MediaType>();

    public MediaType: typeof MediaType = MediaType;

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

    public isActive(mediaType: MediaType): boolean {
        return this.selectedMediaType === mediaType;
    }

    public onTypeSelect(mediaType: MediaType): void {
        this.mediaTypeSelect.emit(mediaType);
    }
}
