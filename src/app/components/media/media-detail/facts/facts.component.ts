import { Component, Input } from '@angular/core';
import { Facts } from '../../../../interfaces/facts';

@Component({
    selector: 'app-facts',
    templateUrl: './facts.component.html',
    styleUrls: ['./facts.component.scss'],
})
export class FactsComponent {
    @Input()
    public facts: Facts;
}
