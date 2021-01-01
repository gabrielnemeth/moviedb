import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimeWindow } from '../../interfaces/time-window';

@Component({
    selector: 'app-time-switch',
    templateUrl: './time-switch.component.html',
})
export class TimeSwitchComponent {
    private _selectedTimeWindow: TimeWindow | null;
    public dayActive: boolean;
    public weekActive: boolean;

    @Input()
    public set selectedTimeWindow(time: TimeWindow | null) {
        this._selectedTimeWindow = time;
        this.dayActive = time === 'day';
        this.weekActive = time === 'week';
    }

    public get selectedTimeWindow(): TimeWindow | null {
        return this._selectedTimeWindow;
    }

    @Output()
    public timeWindowSelect: EventEmitter<TimeWindow> = new EventEmitter<TimeWindow>();
}
