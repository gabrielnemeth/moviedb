import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-media-item-image',
    templateUrl: 'media-item-image.component.html',
    styleUrls: ['media-item-image.component.scss'],
})
export class MediaItemImageComponent {
    @Input()
    public src: string | null;

    @Input()
    public alt: string;

    @Input()
    public clickable: boolean;

    @Input()
    public largeShadow: boolean;
}
