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
    @Input()
    public review: Review;

    @HostBinding('class')
    public class = 'media';

    public getDate(created: string, updated?: string): string {
        const format = 'MMMM D, YYYY';
        return !isNil(updated)
            ? moment(updated).format(format)
            : moment(created).format(format);
    }
}
