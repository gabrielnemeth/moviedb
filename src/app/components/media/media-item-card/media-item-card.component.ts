import { Component, Input } from '@angular/core';
import { MediaListResult } from 'src/app/interfaces/media-list-result';
import { MediaType } from 'src/app/interfaces/media-type';
import { MovieListResult } from 'src/app/interfaces/movie-list-result';
import { TvListResult } from '../../../interfaces/tv-list-result';
import { PersonListResult } from '../../../interfaces/person-list-result';

@Component({
    selector: 'app-media-item-card',
    templateUrl: './media-item-card.component.html',
})
export class MediaItemCardComponent {
    private _mediaItem: MediaListResult;

    @Input()
    public set mediaItem(item: MediaListResult) {
        this._mediaItem = item;

        switch (item.media_type) {
            case MediaType.movie:
                this.movieItem = item as MovieListResult;
                break;
            case MediaType.tv:
                this.tvItem = item as TvListResult;
                break;
            case MediaType.person:
                this.personItem = item as PersonListResult;
        }
    }

    public movieItem: MovieListResult;
    public tvItem: TvListResult;
    public personItem: PersonListResult;
}
