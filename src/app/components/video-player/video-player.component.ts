import {
    Component,
    EventEmitter,
    HostBinding,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import * as Plyr from 'plyr';
import { PlyrComponent } from 'ngx-plyr';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-video-player',
    templateUrl: './video-player.component.html',
    styleUrls: ['./video-player.component.scss'],
    animations: [
        trigger('openClose', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('.1s', style({ opacity: 1 })),
            ]),
            transition(':leave', [animate('.1s', style({ opacity: 0 }))]),
        ]),
    ],
})
export class VideoPlayerComponent {
    @HostBinding('@openClose')
    public get openClose(): string {
        return this.open ? 'open' : 'closed';
    }

    @ViewChild(PlyrComponent, { static: true })
    public plyr: PlyrComponent;

    private _videoSources: Plyr.Source[];

    @Input()
    public set videoSources(sources: Plyr.Source[]) {
        this._videoSources = sources;
        this.open = true;
    }

    public get videoSources(): Plyr.Source[] {
        return this._videoSources;
    }

    @Output()
    public closePlayer: EventEmitter<void> = new EventEmitter();

    public player: Plyr;
    public open: boolean;
    public isPlayerReady: boolean;

    public close(): void {
        this.isPlayerReady = false;
        this.open = false;
        this.closePlayer.emit();
    }

    public playerReady(): void {
        this.isPlayerReady = true;
    }
}
