import {Component, EventEmitter, Inject} from '@angular/core';
import {AbstractDialogComponent} from './AbstractDialogComponent';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ConfirmationDialogComponentData} from './ConfirmationDialogComponentData';

@Component({
    selector: 'confirmation-dialog-component',
    template: `
        <h1 mat-dialog-title>{{ data.title }}</h1>
        <div mat-dialog-content>{{ data.text }}</div>
        <div mat-dialog-actions fxLayout="row" fxLayoutAlign="end">
            <button mat-raised-button color="warn" (click)="cancel()">
                {{ data.cancelText }}
            </button>
            <button
                mat-raised-button
                color="accent"
                cdkFocusInitial
                (keydown.enter)="confirm()"
                (click)="confirm()"
            >
                {{ data.confirmText }}
            </button>
        </div>
    `
})
export class ConfirmationDialogComponent extends AbstractDialogComponent<
ConfirmationDialogComponentData
> {
    public onConfirm = new EventEmitter();
    public onCancel = new EventEmitter();

    public constructor(
        @Inject(MAT_DIALOG_DATA) data: ConfirmationDialogComponentData
    ) {
        super(data);
    }

    public cancel(): void {
        this.onCancel.emit();
        this.hideDialog();
    }

    public confirm(): void {
        this.onConfirm.emit();
        this.hideDialog();
    }
}
