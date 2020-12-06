import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../store/state';
import { selectTrending } from '../../../store/trending/trending.reducer';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MovieListResult } from '../../../interfaces/movie-list-result';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
    public trending$: Observable<MovieListResult>;

    constructor(private store: Store<State>) {}

    public ngOnInit(): void {
        this.trending$ = this.store
            .select(selectTrending)
            .pipe(map((trending) => trending[1]));
    }

    public getStyle(
        imagePath: string | null
    ): {
        [klass: string]: any;
    } {
        return {
            'background-image': `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${imagePath})`,
            'background-size': 'cover',
            'background-repeat': 'no-repeat',
            'background-color': 'black',
        };
    }
}
