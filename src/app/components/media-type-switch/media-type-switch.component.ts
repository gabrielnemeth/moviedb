import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MediaType } from '../../interfaces/media-type';

@Component({
    selector: 'app-media-type-switch',
    templateUrl: './media-type-switch.component.html',
})
export class MediaTypeSwitchComponent {
    @Input()
    public selectedMediaType: MediaType | null;

    @Output()
    public mediaTypeSelect: EventEmitter<MediaType> = new EventEmitter<MediaType>();

    public MediaType: typeof MediaType = MediaType;

    public isActive(mediaType: MediaType): boolean {
        return this.selectedMediaType === mediaType;
    }
}
