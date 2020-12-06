import { Component, Input, ViewChild } from '@angular/core';
import * as Plyr from 'plyr';
import { PlyrComponent } from 'ngx-plyr';

@Component({
    selector: 'app-video-player',
    templateUrl: './video-player.component.html',
    styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent {
    @ViewChild(PlyrComponent, { static: true })
    plyr: PlyrComponent;

    @Input()
    public id: string;

    @Input()
    public open: boolean;

    public player: Plyr;

    public videoSources: Plyr.Source[] = [
        {
            src: 'https://youtube.com/watch?v=KYWzEqX-J-4',
            provider: 'youtube',
        },
    ];

    public getSrc(): string {
        return `https://www.youtube.com/embed/KYWzEqX-J-4?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`;
    }

    public close(): void {
        this.open = false;
    }
}
