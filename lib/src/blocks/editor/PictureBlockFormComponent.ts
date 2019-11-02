import {Component} from '@angular/core';
import {Validators} from '@angular/forms';
import {CustomValidators} from 'ngx-custom-validators';
import {AbstractContentBlockFormComponent} from './AbstractContentBlockFormComponent';
import {BlockFieldDescriptor} from './BlockFieldDescriptor';
import {StorageManagerSelectMode} from "../../components/storage/StorageManagerSelectMode";
import {DialogService} from "../../components/modals/DialogService";
import {PictureBlock} from "../PictureBlock";
import {StorageManagerDialogComponent} from "../../components/storage/StorageManagerDialogComponent";
import {SnackBarService} from "../../components/snacks/SnackBarService";
import {StorageNode} from "../../components/storage/StorageNode";
import {StorageItem} from "../../components/storage/StorageItem";

@Component({
    selector: 'picture-block-form',
    template: `
        <div [formGroup]="form.formGroup">
            <div *ngIf="item">
                <div class="singlePicture">
                    <img [src]="model.data.picture.pictureInfo.mediumThumbnail.publicUri" alt="{{model.data.picture.fileName}}}"/>
                    <div class="addOverlay">
                        <icon (click)="showStorageDialog()" iconName="fa-plus"></icon>
                        <icon
                                (click)="deletePicture()"
                                iconName="fa-trash"
                        ></icon>
                    </div>
                </div>
                <text-input
                        [inputFormGroup]="form.formGroup"
                        [inputFieldName]="getFieldName('url')"
                        inputLabel="Ссылка"
                ></text-input>
            </div>
            <div *ngIf="!item">
                <p style="text-align:center">Выберите изображение</p>
                <p style="text-align:center">
                    <button mat-raised-button color="accent" (click)="showStorageDialog()">
                        Выбрать
                    </button>
                </p>
            </div>
        </div>
    `,
    styleUrls: ['./PictureBlockFormComponent.scss']
})
export class PictureBlockFormComponent extends AbstractContentBlockFormComponent<PictureBlock> {
    constructor(
        protected _dialogService: DialogService,
        snackBarService: SnackBarService
    ) {
        super(snackBarService);
    }

    public item: StorageItem | null;

    protected _getFields(): Array<BlockFieldDescriptor> {
        return [
            new BlockFieldDescriptor('picture', [Validators.required], 'data.picture'),
            new BlockFieldDescriptor('url', [CustomValidators.url], 'data.url')
        ];
    }

    public isEmpty(): boolean {
        return !this.model.data.picture;
    }

    protected _afterInit(): void {
        super._afterInit();
        this.item = this.model.data.picture;
    }

    public deletePicture(): void {
        this.item = null;
        this.model.data.picture = null;
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
                    this.item = node.item;
                });

                const control = this.form.formGroup.get(this.getFieldName('picture'));
                if (control) {
                    control.patchValue(this.item);
                }
            });
    }
}
