import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
    selectMoviesByFilterType,
    selectSelectedMoviesFilterType,
} from 'src/app/store/movies/movies.reducer';
import { State } from 'src/app/store/state';
import { MediaListItem } from '../../../interfaces/media-list-item';
import {
    fetchNowPlayingMovies,
    fetchPopularMovies,
    fetchTopRatedMovies,
    fetchUpcomingMovies,
    selectMoviesFilterType,
} from '../../../store/movies/movies.actions';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-search',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
    public mediaItems$: Observable<
        MediaListItem[] | undefined
    > = this.store.select(selectMoviesByFilterType);

    public movieFilterTypes: { label: string; value: string }[] = [
        { label: 'Popular', value: 'popular' },
        { label: 'Now Playing', value: 'now-playing' },
        { label: 'Upcoming', value: 'upcoming' },
        { label: 'Top Rated', value: 'top-rated' },
    ];

    public selectedFilterType$: Observable<
        | {
              label: string;
              value: string;
          }
        | undefined
    > = this.store
        .select(selectSelectedMoviesFilterType)
        .pipe(
            map((type) => this.movieFilterTypes.find((t) => t.value === type))
        );

    public dropdownActive: boolean;

    public constructor(private store: Store<State>) {}

    public onDropdownClick(): void {
        this.dropdownActive = !this.dropdownActive;
    }

    public onTypeClick(type: string): void {
        this.store.dispatch(
            selectMoviesFilterType({ selectedMoviesFilterType: type })
        );
    }

    public ngOnInit(): void {
        // ToDo: handle on dropdown select
        this.store.dispatch(fetchPopularMovies());
        this.store.dispatch(fetchNowPlayingMovies());
        this.store.dispatch(fetchUpcomingMovies());
        this.store.dispatch(fetchTopRatedMovies());
    }
}
