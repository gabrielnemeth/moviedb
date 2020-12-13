import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { MediaType } from '../../interfaces/media-type';
import { MediaListItem } from '../../interfaces/media-list-item';
import { TimeWindow } from '../../interfaces/time-window';

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
    public timeWindowSwitcher: boolean;

    @Input()
    public selectedMediaType: MediaType | null;

    @Input()
    public selectedTimeWindow: TimeWindow | null;

    @Output()
    public mediaTypeSelect: EventEmitter<MediaType> = new EventEmitter<MediaType>();

    @Output()
    public timeWindowSelect: EventEmitter<TimeWindow> = new EventEmitter<TimeWindow>();

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
}
