import {Component} from '@angular/core';
import {Validators} from '@angular/forms';
import {AbstractContentBlockFormComponent} from './AbstractContentBlockFormComponent';
import {BlockFieldDescriptor} from './BlockFieldDescriptor';
import Dictionary from "../../components/Dictionary";
import {StorageManagerSelectMode} from "../../components/storage/StorageManagerSelectMode";
import {DialogService} from "../../components/modals/DialogService";
import {GalleryBlock} from "../GalleryBlock";
import {StorageManagerDialogComponent} from "../../components/storage/StorageManagerDialogComponent";
import {SnackBarService} from "../../components/snacks/SnackBarService";
import {StorageItem} from "../../components/storage/StorageItem";
import {StorageNode} from "../../components/storage/StorageNode";

@Component({
    selector: 'gallery-block-form',
    template: `
        <div [formGroup]="form.formGroup">
            <div *ngIf="items.size() > 0">
                <div class="picturesList">
                    <ng-container *ngFor="let picture of items.values()">
                        <div class="pic">
                            <img [src]="picture.publicUri" alt="{{ picture.fileName }}"/>
                            <div (click)="deletePicture(picture)" class="deleteOverlay">
                                <icon iconName="fa-trash"></icon>
                            </div>
                        </div>
                    </ng-container>
                    <div class="addButton">
                        <icon (click)="showStorageDialog(false)" iconName="fa-plus"></icon>
                    </div>
                </div>
            </div>
            <div *ngIf="items.size() == 0">
                <p style="text-align:center">Выберите одно или несколько изображений</p>
                <p style="text-align:center">
                    <button mat-raised-button color="accent" (click)="showStorageDialog()">
                        Выбрать
                    </button>
                </p>
            </div>
        </div>
    `,
    styleUrls: ['./GalleryBlockFormComponent.scss']
})
export class GalleryBlockFormComponent extends AbstractContentBlockFormComponent<GalleryBlock> {
    constructor(
        protected _dialogService: DialogService,
        snackBarService: SnackBarService
    ) {
        super(snackBarService);
    }

    public readonly items = new Dictionary<number, StorageItem>();

    protected _getFields(): Array<BlockFieldDescriptor> {
        return [new BlockFieldDescriptor('pictures', [Validators.required], 'data.pictures')];
    }

    public isEmpty(): boolean {
        return this.model.data.pictures.length === 0;
    }

    protected _afterInit(): void {
        super._afterInit();
        this.model.data.pictures.forEach(item => {
            this.items.set(item.id, item);
        });
    }

    public deletePicture(pic: StorageItem): void {
        this.items.remove(pic.id);
        this.model.data.pictures = this.items.values();
    }

    public showStorageDialog(replace = false): void {
        this._dialogService
            .show(StorageManagerDialogComponent, StorageManagerSelectMode.Multiple, (config) => {
                config.maxWidth = '90vw';
                config.width = '90vw';
            })
            .dialogRef.afterClosed()
            .subscribe((nodes: Array<StorageNode>) => {
                if (replace) {
                    this.items.clear();
                }
                nodes.forEach(node => {
                    this.items.set(node.item.id, node.item);
                });

                const control = this.form.formGroup.get(this.getFieldName('pictures'));
                if (control) {
                    control.patchValue(this.items.values());
                }
            });
    }
}
