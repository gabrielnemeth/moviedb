import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-media-item-placeholder-image',
    templateUrl: 'media-item-placeholder-image.component.html',
    styleUrls: ['media-item-placeholder-image.component.scss'],
})
export class MediaItemPlaceholderImageComponent {
    @Input()
    public iconClassNames = 'far fa-file-image';
}
