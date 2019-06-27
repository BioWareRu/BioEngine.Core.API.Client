import {Component, ElementRef, ViewChild} from '@angular/core';
import {Validators} from '@angular/forms';
import {BlockFieldDescriptor} from './BlockFieldDescriptor';
import {AbstractEditorBlockFormComponent} from "./AbstractEditorBlockFormComponent";
import {ContentBlockItemType} from "../ContentBlockItemType";
import {TextBlock} from "../TextBlock";
import {SnackBarService} from "../../components/snacks/SnackBarService";

@Component({
    selector: 'text-block-form',
    template: `
        <div [formGroup]="form.formGroup">
            <ng-container *ngIf="!htmlMode">
                <ckeditor
                        #editor
                        [editor]="editorInstance"
                        [config]="editorConfig"
                        [formControlName]="getFieldName('text')"
                        (ready)="ready($event)"
                ></ckeditor>
                <div style="text-align: right"><a mat-button (click)="switchHtml()">Редактировать HTML</a></div>
            </ng-container>
            <ng-container *ngIf="htmlMode">
                <textarea-input [inputFieldName]="getFieldName('text')" [inputFormGroup]="form.formGroup"></textarea-input>
                <div style="text-align: right"><a mat-button (click)="switchHtml()">Вернуться в редактор</a></div>
            </ng-container>
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
export class TextBlockFormComponent extends AbstractEditorBlockFormComponent<TextBlock> {
    constructor(snackBarService: SnackBarService) {
        super(snackBarService);
    }

    view: any;
    focusOnReady: boolean;
    htmlMode = false;

    splitSymbol = '‌‌\u200C';

    @ViewChild('editor', {static: true}) editorElement: ElementRef<HTMLElement>;

    protected _getFields(): Array<BlockFieldDescriptor> {
        return [new BlockFieldDescriptor('text', [Validators.required], 'data.text')];
    }

    public switchHtml(): void {
        this.htmlMode = !this.htmlMode;
    }

    private _onDelete(): void {
        this.blocksManager.removeBlock(this.model);
        this.blocksManager.update();
    }

    private _onSplit(): void {
        const parts = this.model.data.text.split(this.splitSymbol);
        const id = this.getFieldName('text');
        const control = this.form.formGroup.get(id);
        if (!control) {
            throw new Error('No control for id ' + id);
        }
        control.setValue(parts[0]);
        const nextBlock = this.blocksManager.createBlock<TextBlock>(ContentBlockItemType.Text);
        nextBlock.data.text = parts[1];
        nextBlock.inFocus = true;
        this.blocksManager.addBlock(nextBlock, this.model);
        this.blocksManager.update();
    }

    public isEmpty(): boolean {
        return this.model.data.text === '' || this.model.data.text === '<p>&nbsp;</p>';
    }

    protected _setFocus(): void {
        this.focus();
    }

    public ready(editor): void {
        this.view = editor.editing.view;
        if (this.focusOnReady) {
            this.view.focus();
        }
        const model = editor.model;
        const doc = model.document;
        this.view.document.on('enter', (eventInfo, data) => {
            data.preventDefault();
            if (!data.isSoft) {
                editor.model.change(writer => {
                    const splitPos = doc.selection.getFirstRange().start;
                    writer.split(splitPos);
                    writer.setSelection(splitPos.parent.nextSibling, 'before');

                    writer.insert(
                        writer.createText(this.splitSymbol),
                        doc.selection.getFirstRange().start
                    );
                });
                eventInfo.stop();
                this._onSplit();
            }
        });
        editor.keystrokes.set('backspace', () => {
            if (this.isEmpty()) {
                this._onDelete();
            }
        });
    }

    focus(): void {
        this.focusOnReady = true;
    }
}
