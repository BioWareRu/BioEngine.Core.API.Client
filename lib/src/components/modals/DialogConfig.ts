import {Direction} from '@angular/cdk/bidi';
import {ScrollStrategy} from '@angular/cdk/overlay';
import {ViewContainerRef} from '@angular/core';
import {DialogPosition, DialogRole} from '@angular/material/dialog';

export class DialogConfig {
    public ariaDescribedBy: string;
    public ariaLabel: string;
    public autoFocus = true;
    public backdropClass: string;
    public closeOnNavigation = false;
    public direction: Direction;
    public disableClose = false;
    public hasBackdrop = true;
    public height: string;
    public width = '500px';
    public id: string;
    public maxHeight: number | string;
    public maxWidth: number | string;
    public minHeight: number | string;
    public minWidth: number | string;
    public position: DialogPosition;
    public restoreFocus = true;
    public role: DialogRole;
    public scrollStrategy: ScrollStrategy;
    public viewContainerRef: ViewContainerRef;
    public data: any;
}
