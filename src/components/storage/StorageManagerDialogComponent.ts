import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AbstractDialogComponent} from '../modals/AbstractDialogComponent';
import {StorageManagerComponent} from './StorageManagerComponent';
import {StorageManagerSelectMode} from './StorageManagerSelectMode';

@Component({
    selector: 'storageManageDialog',
    template: `
        <h1 mat-dialog-title>Хранилище</h1>
        <div mat-dialog-content>
            <storage-manager [selectMode]="data"></storage-manager>
        </div>
        <div mat-dialog-actions fxLayout="row" fxLayoutAlign="end">
            <button mat-raised-button color="warn" (click)="select()">
                Выбрать
            </button>
        </div>
    `
})
export class StorageManagerDialogComponent extends AbstractDialogComponent<StorageManagerSelectMode> implements OnInit {
    public constructor(@Inject(MAT_DIALOG_DATA) data: StorageManagerSelectMode) {
        super(data);
    }

    @ViewChild(StorageManagerComponent, { static: true }) storageManager: StorageManagerComponent;

    ngOnInit(): void {
    }

    public select(): void {
        const items = this.storageManager.confirmSelect();
        this.dialogRef.close(items);
    }
}
