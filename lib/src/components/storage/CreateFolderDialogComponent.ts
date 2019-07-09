import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AbstractDialogComponent} from '../modals/AbstractDialogComponent';

@Component({
    selector: 'confirmation-dialog-component',
    template: `
        <h1 mat-dialog-title>Создать папку</h1>
        <div mat-dialog-content>
            <mat-form-field [fxFlex]="100" [appearance]="'standard'">
                <mat-label>Название папки</mat-label>
                <input matInput [(ngModel)]="folderName" required type="text" placeholder="Название папки"/>
            </mat-form-field>
        </div>
        <div mat-dialog-actions fxLayout="row" fxLayoutAlign="end">
            <button mat-raised-button color="warn" (click)="cancel()">Отмена</button>
            <button
                    mat-raised-button
                    color="accent"
                    cdkFocusInitial
                    [disabled]="folderName === null || folderName === ''"
                    (keydown.enter)="confirm()"
                    (click)="confirm()"
            >
                Создать
            </button>
        </div>
    `
})
export class CreateFolderDialogComponent extends AbstractDialogComponent<string> {
    public folderName: string;

    public constructor(
        @Inject(MAT_DIALOG_DATA)
            data: string) {
        super(data);
    }

    public confirm(): void {
        this.dialogRef.close(this.folderName);
    }

    public cancel(): void {
        this.dialogRef.close();
    }
}
