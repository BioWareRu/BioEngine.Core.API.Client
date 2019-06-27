import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {CustomValidators} from 'ngx-custom-validators';
import {AbstractContentBlockFormComponent} from './AbstractContentBlockFormComponent';
import {BlockFieldDescriptor} from './BlockFieldDescriptor';
import {YoutubeBlock} from "../YoutubeBlock";
import {FieldInputChange} from "../../components/forms/FieldInputChange";
import {SnackBarService} from "../../components/snacks/SnackBarService";

@Component({
    selector: 'youtube-block-form',
    template: `
        <text-input
                *ngIf="editMode"
                [inputFormGroup]="form.formGroup"
                [inputFieldName]="getFieldName('youtubeUrl')"
                inputLabel="Url видео"
        ></text-input>
        <div *ngIf="!editMode" style="text-align:center">
            <iframe
                    frameborder="0"
                    height="315"
                    [src]="model.data.youtubeUrl | safe"
                    width="560"
            ></iframe>
            <icon classes="editUrl" iconName="fa-edit" (click)="edit()"></icon>
        </div>
    `,
    styleUrls: [`./YoutubeBlockFormComponent.scss`]
})
export class YoutubeBlockFormComponent extends AbstractContentBlockFormComponent<YoutubeBlock> implements OnInit {
    constructor(snackBarService: SnackBarService) {
        super(snackBarService);
    }

    public editMode = true;

    private static _youTubeGetID(url: string): string | null {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        const match = url.match(regExp);

        return match && match[7].length === 11 ? match[7] : null;
    }

    protected _getFields(): Array<BlockFieldDescriptor> {
        return [
            new BlockFieldDescriptor(
                'youtubeUrl',
                [Validators.required, CustomValidators.url],
                'data.youtubeUrl'
            )
        ];
    }

    public ngOnInit(): void {
        if (this.model.data.youtubeId) {
            this.model.data.youtubeUrl = this._getUrl();
        }
        super.ngOnInit();
    }

    protected _afterInit(): void {
        super._afterInit();
        if (this.model.data.youtubeId) {
            this.editMode = false;
        }
        this.form.onChange.subscribe((change: FieldInputChange) => {
            if (change.key === this.getFieldName('youtubeUrl')) {
                const id = YoutubeBlockFormComponent._youTubeGetID(change.newValue);
                if (id) {
                    this.model.data.youtubeId = id;
                    this._updateUrl();
                    this.editMode = false;
                }
            }
        });
    }

    private _updateUrl(): void {
        this.form.getControlByProperty('data.youtubeUrl').patchValue(this._getUrl());
    }

    private _getUrl(): string {
        return 'https://www.youtube.com/embed/' + this.model.data.youtubeId;
    }

    public isEmpty(): boolean {
        return this.model.data.youtubeId === '';
    }

    public edit(): void {
        this.editMode = true;
    }
}
