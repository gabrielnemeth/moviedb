import { Component, Input } from '@angular/core';
import { MediaListResult } from 'src/app/interfaces/media-list-result';

@Component({
    selector: 'app-media-item-list',
    templateUrl: './media-item-list.component.html',
})
export class MediaItemListComponent {
    @Input()
    public mediaItems: MediaListResult[];
}
