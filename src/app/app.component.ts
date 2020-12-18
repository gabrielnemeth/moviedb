import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchGenres } from './store/genre/genre.actions';
import { State } from './store/state';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    public constructor(private store: Store<State>) {}

    public ngOnInit(): void {
        this.store.dispatch(fetchGenres());
    }
}
