    import { Component, Input } from '@angular/core';
    import {SectionsCacheProvider} from "../../cache/SectionsCacheProvider";

@Component({
    selector: 'sectionsList',
    template: `
        <mat-chip-list *ngIf="ids">
            <mat-chip
                    selected
                    *ngFor="let section of (provider.get(ids) | async).values()"
                    title="{{ section.title }}"
            >
                {{ section.title | truncate: 30 }}
            </mat-chip>
        </mat-chip-list>
    `
})
export class SectionsLabelsListComponent {
    @Input()
    public ids: Array<string>;
    constructor(public provider: SectionsCacheProvider) {}
}
