import {Component, ElementRef, ViewChild} from '@angular/core';
import {Validators} from '@angular/forms';
import {BlockFieldDescriptor} from './BlockFieldDescriptor';
import {CustomValidators} from 'ngx-custom-validators';
import {AbstractEditorBlockFormComponent} from "./AbstractEditorBlockFormComponent";
import {QuoteBlock} from "../QuoteBlock";
import {SnackBarService} from "../../components/snacks/SnackBarService";

@Component({
    selector: 'quote-block-form',
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
                    <textarea-input [inputFieldName]="getFieldName('text')" [inputFormGroup]="form.formGroup"></textarea-input>
                    <div style="text-align: right"><a mat-button (click)="switchHtml()">Вернуться в редактор</a></div>
                </ng-container>
            </div>
            <hr/>
            <div fxLayout="row wrap"
                 fxLayoutGap="grid">
                <text-input [inputFormGroup]="form.formGroup"
                            [inputFieldName]="getFieldName('author')"
                            inputLabel="Автор" fxFlex=40 style="margin-right: 10%"></text-input>
                <text-input [inputFormGroup]="form.formGroup"
                            [inputFieldName]="getFieldName('link')"
                            inputLabel="Ссылка" fxFlex=40></text-input>
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
    constructor(snackBarService: SnackBarService) {
        super(snackBarService);
    }

    view: any;
    focusOnReady: boolean;
    htmlMode = false;

    @ViewChild('editor', { static: true }) editorElement: ElementRef<HTMLElement>;

    public switchHtml(): void {
        this.htmlMode = !this.htmlMode;
    }

    protected _getFields(): Array<BlockFieldDescriptor> {
        return [
            new BlockFieldDescriptor('text', [Validators.required], 'data.text'),
            new BlockFieldDescriptor('author', [], 'data.author'),
            new BlockFieldDescriptor('link', [CustomValidators.url], 'data.link')
        ];
    }

    public isEmpty(): boolean {
        return this.model.data.text === '' || this.model.data.text === '<p>&nbsp;</p>';
    }

    protected _setFocus(): void {
        this.focus();
    }

    focus(): void {
        this.focusOnReady = true;
    }
}
