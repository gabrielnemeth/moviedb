import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-header-bar',
    templateUrl: './header-bar.component.html',
    styleUrls: ['./header-bar.component.scss'],
})
export class HeaderBarComponent {
    @Input()
    public dark: boolean;

    public isMenuActive: boolean;

    public toggleMenu(): void {
        this.isMenuActive = !this.isMenuActive;
    }
}
