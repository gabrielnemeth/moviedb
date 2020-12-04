import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/state';
import { PersonListResult } from '../../../../interfaces/person-list-result';

@Component({
    selector: 'app-person-card',
    templateUrl: './person-card.component.html',
    styleUrls: ['./person-card.component.scss'],
})
export class PersonCardComponent {
    @Input()
    public person: PersonListResult;

    public constructor(private store: Store<State>, private router: Router) {}

    public getYear(date: string): string {
        return new Date(date).getFullYear().toString();
    }

    public showMediaItem(id: number): void {
        this.router.navigate(['/person', id]);
    }
}
