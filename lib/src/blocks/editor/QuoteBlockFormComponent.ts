import {Component, ElementRef, ViewChild} from '@angular/core';
import {Validators} from '@angular/forms';
import {BlockFieldDescriptor} from './BlockFieldDescriptor';
import {CustomValidators} from 'ngx-custom-validators';
import {AbstractEditorBlockFormComponent} from "./AbstractEditorBlockFormComponent";
import {QuoteBlock} from "../QuoteBlock";
import {SnackBarService} from "../../components/snacks/SnackBarService";
import {StorageManagerDialogComponent} from "../../components/storage/StorageManagerDialogComponent";
import {StorageManagerSelectMode} from "../../components/storage/StorageManagerSelectMode";
import {StorageNode} from "../../components/storage/StorageNode";
import {DialogService} from "../../components/modals/DialogService";
import {StorageItem} from "../../components/storage/StorageItem";

@Component({
    selector: 'quote-block-form',
    styleUrls: [`./QuoteBlockFormComponent.scss`],
    template: `
        <div [formGroup]="form.formGroup">
            <div>
                <ng-container *ngIf="!htmlMode">
                    <ckeditor
                        #editor
                        [editor]="editorInstance"
                        [config]="editorConfig"
                        [formControlName]="getFieldName('text')"
                    ></ckeditor>
                    <div style="text-align: right"><a mat-button (click)="switchHtml()">Редактировать HTML</a></div>
                </ng-container>
                <ng-container *ngIf="htmlMode">
                    <textarea-input [inputFieldName]="getFieldName('text')"
                                    [inputFormGroup]="form.formGroup"></textarea-input>
                    <div style="text-align: right"><a mat-button (click)="switchHtml()">Вернуться в редактор</a></div>
                </ng-container>
            </div>
            <hr/>
            <div fxLayout="row wrap"
                 fxLayoutGap="grid">
                <text-input [inputFormGroup]="form.formGroup"
                            [inputFieldName]="getFieldName('author')"
                            inputLabel="Автор" fxFlex=30 style="margin-right: 10%"></text-input>
                <text-input [inputFormGroup]="form.formGroup"
                            [inputFieldName]="getFieldName('link')"
                            inputLabel="Ссылка" fxFlex=30></text-input>
                <div class="singlePicture" fxFlex=30>
                    <div>
                        <mat-label>Изображение автора</mat-label>
                    </div>
                    <img *ngIf="model.data.picture!=null"
                         [src]="model.data.picture.pictureInfo.smallThumbnail.publicUri"
                         alt="{{model.data.picture.fileName}}"/>
                    <span *ngIf="model.data.picture==null">Выберите изображение</span>
                    <div class="addOverlay">
                        <icon (click)="showStorageDialog()" iconName="fa-plus"></icon>
                        <icon
                            (click)="deletePicture()"
                            iconName="fa-trash"
                        ></icon>
                    </div>
                </div>
            </div>

        </div>
    `,
    styles: [
            `
            .ck.ck-editor__editable_inline > :last-child {
                margin-bottom: 5px;
            }

            .ck.ck-editor__editable_inline > :first-child {
                margin-top: 5px;
            }
        `
    ]
})

export class QuoteBlockFormComponent extends AbstractEditorBlockFormComponent<QuoteBlock> {
    private item: StorageItem;

    constructor(protected _dialogService: DialogService, snackBarService: SnackBarService) {
        super(snackBarService);
    }

    view: any;
    focusOnReady: boolean;
    htmlMode = false;

    @ViewChild('editor', {static: true}) editorElement: ElementRef<HTMLElement>;

    public switchHtml(): void {
        this.htmlMode = !this.htmlMode;
    }

    protected _getFields(): Array<BlockFieldDescriptor> {
        return [
            new BlockFieldDescriptor('text', [Validators.required], 'data.text'),
            new BlockFieldDescriptor('author', [], 'data.author'),
            new BlockFieldDescriptor('link', [CustomValidators.url], 'data.link'),
            new BlockFieldDescriptor('picture', [], 'data.picture'),
        ];
    }

    public isEmpty(): boolean {
        return this.model.data.text === '' || this.model.data.text === '<p>&nbsp;</p>';
    }

    protected _afterInit(): void {
        super._afterInit();
        this.item = this.model.data.picture;
    }

    protected _setFocus(): void {
        this.focus();
    }

    focus(): void {
        this.focusOnReady = true;
    }

    public deletePicture(): void {
        this.model.data.picture = null;
        this.item = null;
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
