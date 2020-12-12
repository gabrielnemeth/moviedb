import { Component, Input } from '@angular/core';
import { MediaListItem } from '../../../interfaces/media-list-item';

@Component({
    selector: 'app-media-item-list',
    templateUrl: './media-item-list.component.html',
})
export class MediaItemListComponent {
    @Input()
    public mediaItems: MediaListItem[];
}
