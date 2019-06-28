import {Component, HostBinding, Input} from '@angular/core';
import {Icon} from './Icon';

@Component({
    selector: 'icon',
    template: `
        <mat-icon *ngIf="icon" [fontIcon]="icon.icon" [fontSet]="icon.set"></mat-icon>
        <mat-icon *ngIf="iconName" [fontIcon]="iconName" [fontSet]="iconSet"></mat-icon>
    `,
    styleUrls: [`Icon.scss`]
})
export class IconComponent {
    @Input()
    icon: Icon;
    @Input()
    iconSet = 'fas';
    @Input()
    iconName: string;
    @HostBinding('class')
    @Input()
    classes: string;
}
