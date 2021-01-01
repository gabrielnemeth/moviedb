import { Component, HostBinding, Input } from '@angular/core';
import { Review } from '../../../../interfaces/review';
import { isNil } from 'lodash-es';
import * as moment from 'moment';

@Component({
    selector: 'app-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.scss'],
})
export class ReviewComponent {
    private _review: Review;
    public date: string;
    public initialChar: string;

    @Input()
    public set review(rev: Review) {
        this._review = rev;
        this.date = this.getDate(rev.created_at, rev.updated_at);
        this.initialChar = rev.author_details.username.charAt(0);
    }

    public get review(): Review {
        return this._review;
    }

    @HostBinding('class')
    public class = 'media';

    private getDate(created: string, updated?: string): string {
        const format = 'MMMM D, YYYY';
        return !isNil(updated)
            ? moment(updated).format(format)
            : moment(created).format(format);
    }
}
