import { Component, Input } from '@angular/core';
import { RecommendedMedia } from '../../../../interfaces/recommended-media';
import { MediaType } from '../../../../interfaces/media-type';
import { Router } from '@angular/router';

@Component({
    selector: 'app-recommendations',
    templateUrl: './recommendations.component.html',
    styleUrls: ['./recommendations.component.scss'],
})
export class RecommendationsComponent {
    @Input()
    public recommendations: RecommendedMedia[];

    public constructor(private router: Router) {}

    public showMediaItem(type: MediaType, id: number): void {
        let path;
        if (type === MediaType.movie) {
            path = '/movie';
        }

        if (type === MediaType.tv) {
            path = '/tv';
        }

        this.router.navigate([path, id]);
    }
}
