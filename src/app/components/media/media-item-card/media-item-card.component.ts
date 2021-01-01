import { Component, Input } from '@angular/core';
import { MediaListItem } from '../../../interfaces/media-list-item';
import { Observable, of } from 'rxjs';
import { getGenreById } from '../../../store/genre/genre.reducer';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from '../../../store/state';
import { Router } from '@angular/router';
import { MediaType } from '../../../interfaces/media-type';
import { isNil } from 'lodash-es';

@Component({
    selector: 'app-media-item-card',
    templateUrl: './media-item-card.component.html',
    styleUrls: ['./media-item-card.component.scss'],
})
export class MediaItemCardComponent {
    private _media: MediaListItem;
    public year?: string;
    public genre$: Observable<string | undefined>;

    @Input()
    public set media(item: MediaListItem) {
        this._media = item;
        this.year = this.getYear(item.releaseDate);
        this.genre$ = this.getGenreString(item.genresIds, item.type);
    }

    public get media(): MediaListItem {
        return this._media;
    }

    public constructor(private store: Store<State>, private router: Router) {}

    private getGenreString(
        ids: number[] | undefined,
        mediaType: MediaType
    ): Observable<string | undefined> {
        if (isNil(ids)) {
            return of(undefined);
        }
        // Return only first if there are more genres for the movie.
        const firstId = ids.slice(0, 1);
        return firstId.length > 0
            ? this.store
                  .select(getGenreById, { id: firstId[0], mediaType })
                  .pipe(map((g) => g?.name))
            : of(undefined);
    }

    private getYear(date: string | undefined): string | undefined {
        if (isNil(date)) {
            return date;
        }
        return new Date(date).getFullYear().toString();
    }

    public showMediaItem(type: MediaType, id: number): void {
        let path;
        if (type === MediaType.movie) {
            path = '/movie';
        }

        if (type === MediaType.tv) {
            path = '/tv';
        }

        if (type === MediaType.person) {
            path = '/person';
        }

        this.router.navigate([path, id]);
    }
}
