import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-rating-badge',
    templateUrl: './rating-badge.component.html',
    styleUrls: ['./rating-badge.component.scss'],
})
export class RatingBadgeComponent {
    @Input()
    public rating: number;
}
