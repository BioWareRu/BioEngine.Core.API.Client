import {Component} from '@angular/core';
import {Validators} from '@angular/forms';
import {AbstractContentBlockFormComponent} from './AbstractContentBlockFormComponent';
import {BlockFieldDescriptor} from './BlockFieldDescriptor';
import {FileBlock} from "../FileBlock";
import {StorageManagerSelectMode} from "../../components/storage/StorageManagerSelectMode";
import {DialogService} from "../../components/modals/DialogService";
import {StorageManagerDialogComponent} from "../../components/storage/StorageManagerDialogComponent";
import {SnackBarService} from "../../components/snacks/SnackBarService";
import {StorageNode} from "../../components/storage/StorageNode";
import {StorageItem} from "../../components/storage/StorageItem";

@Component({
    selector: 'file-block-form',
    template: `
        <div [formGroup]="form.formGroup">
            <div class="file" *ngIf="file">
                <div class="icon">
                    <icon iconName="fa-file"></icon>
                </div>
                <p>{{ file.fileName }}</p>
                <p>{{ file.fileSize | fileSize }}</p>
                <div (click)="delete()" class="deleteOverlay">
                    <icon iconName="fa-trash"></icon>
                </div>
            </div>
            <div *ngIf="!file">
                <p style="text-align:center">Выберите файл</p>
                <p style="text-align:center">
                    <button mat-raised-button color="accent" (click)="showStorageDialog()">
                        Выбрать
                    </button>
                </p>
            </div>
        </div>
    `,
    styleUrls: [`./FileBlockFormComponent.scss`]
})
export class FileBlockFormComponent extends AbstractContentBlockFormComponent<FileBlock> {
    public file: StorageItem | null;

    constructor(
        protected _dialogService: DialogService,
        snackBarService: SnackBarService
    ) {
        super(snackBarService);
    }

    protected _getFields(): Array<BlockFieldDescriptor> {
        return [new BlockFieldDescriptor('file', [Validators.required], 'data.file')];
    }

    public isEmpty(): boolean {
        return !this.model.data.file || this.model.data.file.fileSize === 0;
    }

    protected _afterInit(): void {
        super._afterInit();
        if (!this.model.isEmpty()) {
            this.file = this.model.data.file;
        }
    }

    public delete(): void {
        this.file = null;
        this.model.data.file = null;
    }

    public showStorageDialog(): void {
        this._dialogService
            .show(StorageManagerDialogComponent, StorageManagerSelectMode.Single, (config) => {
                config.maxWidth = '90vw';
                config.width = '90vw';
            })
            .dialogRef.afterClosed()
            .subscribe((nodes: Array<StorageNode>) => {
                nodes.forEach(node => {
                    this.file = node.item;
                });

                const control = this.form.formGroup.get(this.getFieldName('file'));
                if (control) {
                    control.patchValue(this.file);
                }
            });
    }
}
