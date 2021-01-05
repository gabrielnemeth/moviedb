import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MediaType } from '../../interfaces/media-type';

@Component({
    selector: 'app-media-type-switch',
    templateUrl: './media-type-switch.component.html',
})
export class MediaTypeSwitchComponent {
    private _selectedMediaType: MediaType | null;
    public movieActive: boolean;
    public tvActive: boolean;

    @Input()
    public set selectedMediaType(type: MediaType | null) {
        this._selectedMediaType = type;
        this.movieActive = this.selectedMediaType === MediaType.movie;
        this.tvActive = this.selectedMediaType === MediaType.tv;
    }

    public get selectedMediaType(): MediaType | null {
        return this._selectedMediaType;
    }

    @Output()
    public mediaTypeSelect: EventEmitter<MediaType> = new EventEmitter<MediaType>();

    public MediaType: typeof MediaType = MediaType;
}
