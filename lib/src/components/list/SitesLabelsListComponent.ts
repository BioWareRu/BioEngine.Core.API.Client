import { Component, Input } from '@angular/core';
import {SitesCacheProvider} from "../../cache/SitesCacheProvider";

@Component({
    selector: 'sitesList',
    template: `
        <mat-chip-list *ngIf="ids">
            <mat-chip selected *ngFor="let site of (provider.get(ids) | async).values()">
                {{ site.title }}
            </mat-chip>
        </mat-chip-list>
    `
})
export class SitesLabelsListComponent {
    @Input()
    public ids: Array<string>;
    constructor(public provider: SitesCacheProvider) {}
}
