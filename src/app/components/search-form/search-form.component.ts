import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SearchType } from 'src/app/interfaces/search-type';
import { mediaSearch } from 'src/app/store/searched-media/searched-media.actions';
import { State } from '../../store/state';

@Component({
    selector: 'app-search-form',
    templateUrl: 'search-form.component.html',
    styleUrls: ['search-form.component.scss'],
})
export class SearchFormComponent {
    public searchTypes: {
        id: number;
        name: string;
        search_type: SearchType;
    }[] = [
        { id: 0, name: 'All', search_type: SearchType.multi },
        { id: 1, name: 'Movies', search_type: SearchType.movie },
        { id: 2, name: 'TV Shows', search_type: SearchType.tv },
        { id: 3, name: 'People', search_type: SearchType.person },
    ];

    public searchForm: FormGroup = new FormGroup({
        selectedSearchType: new FormControl(this.searchTypes[0]),
        query: new FormControl('', Validators.required),
    });
    public constructor(private store: Store<State>, private router: Router) {}

    public searchForMovies(): void {
        this.store.dispatch(
            mediaSearch({
                query: this.searchForm.value.query,
                search_type: this.searchForm.value.selectedSearchType
                    .search_type,
            })
        );
        this.router.navigate(['search']);
    }
}
