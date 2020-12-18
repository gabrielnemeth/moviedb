import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimeWindow } from '../../interfaces/time-window';

@Component({
    selector: 'app-time-switch',
    templateUrl: './time-switch.component.html',
})
export class TimeSwitchComponent {
    @Input()
    public selectedTimeWindow: TimeWindow | null;

    @Output()
    public timeWindowSelect: EventEmitter<TimeWindow> = new EventEmitter<TimeWindow>();

    public isActive(timeWindow: TimeWindow): boolean {
        return this.selectedTimeWindow === timeWindow;
    }
}
