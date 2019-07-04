import { Component, Input } from '@angular/core';
import {TagsCacheProvider} from "../../cache/TagsCacheProvider";

@Component({
    selector: 'tagsList',
    template: `
        <mat-chip-list *ngIf="ids">
            <mat-chip
                    selected
                    *ngFor="let tag of (provider.get(ids) | async).values()"
                    title="{{ tag.title }}"
            >
                {{ tag.title | truncate: 30 }}
            </mat-chip>
        </mat-chip-list>
    `
})
export class TagsLabelsListComponent {
    @Input()
    public ids: Array<string>;

    constructor(public provider: TagsCacheProvider) {
    }
}
