import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-review-content',
    templateUrl: './review-content.component.html',
})
export class ReviewContentComponent {
    private _content: string;

    @Input()
    public set content(text: string) {
        this._content = text;
        this.trimmedContent = text.slice(0, 600);
        this.contentToDisplay = this.trimmedContent;
    }

    public get content(): string {
        return this._content;
    }

    public trimmedContent: string;
    public contentToDisplay: string;

    public showMore(): void {
        this.contentToDisplay = this.content;
    }
}
