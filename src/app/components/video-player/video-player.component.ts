import {
    Component,
    EventEmitter,
    HostBinding,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { Player } from '@vime/angular';

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
        trigger('showHide', [
            state(
                'show',
                style({
                    opacity: 1,
                })
            ),
            state(
                'hide',
                style({
                    opacity: 0,
                })
            ),
            transition('show <=> hide', [animate('.3s')]),
        ]),
    ],
})
export class VideoPlayerComponent {
    @HostBinding('@openClose')
    public get openClose(): string {
        return this.open ? 'open' : 'closed';
    }

    @Input()
    public youtubeId: string;

    @Output()
    public closePlayer: EventEmitter<void> = new EventEmitter();

    @ViewChild('player')
    public player!: Player;

    public open = true;
    public isPlayerReady: boolean;

    public close(): void {
        this.isPlayerReady = false;
        this.open = false;
        this.closePlayer.emit();
    }

    public posterLoaded(): void {
        this.isPlayerReady = true;
    }
}
