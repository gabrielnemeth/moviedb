import { Component, Input } from '@angular/core';
import { MediaListItem } from '../../../interfaces/media-list-item';
import { Observable, of } from 'rxjs';
import { getGenreById } from '../../../store/genre/genre.reducer';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from '../../../store/state';
import { Router } from '@angular/router';
import { MediaType } from '../../../interfaces/media-type';

@Component({
    selector: 'app-media-item-card',
    templateUrl: './media-item-card.component.html',
    styleUrls: ['./media-item-card.component.scss'],
})
export class MediaItemCardComponent {
    @Input()
    public media: MediaListItem;

    public constructor(private store: Store<State>, private router: Router) {}

    public getGenreString(
        ids: number[],
        mediaType: MediaType
    ): Observable<string | undefined> {
        // Return only first if there are more genres for the movie.
        const firstId = ids.slice(0, 1);
        return firstId.length > 0
            ? this.store
                  .select(getGenreById, { id: firstId[0], mediaType })
                  .pipe(map((g) => g?.name))
            : of(undefined);
    }

    public getYear(date: string): string {
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
