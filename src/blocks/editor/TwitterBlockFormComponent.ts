import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {AbstractContentBlockFormComponent} from './AbstractContentBlockFormComponent';
import {BlockFieldDescriptor} from './BlockFieldDescriptor';
import {CustomValidators} from 'ngx-custom-validators';
import * as url from 'url';
import {FieldInputChange} from "../../components/forms/FieldInputChange";
import {TwitterBlock} from "../TwitterBlock";
import {SnackBarService} from "../../components/snacks/SnackBarService";

@Component({
    selector: 'twitter-block-form',
    template: `
        <text-input
                *ngIf="editMode"
                [inputFormGroup]="form.formGroup"
                [inputFieldName]="getFieldName('tweetUrl')"
                inputLabel="Адрес твита"
        ></text-input>
        <div *ngIf="!editMode" fxLayout="row" fxLayoutAlign="center center">
            <div id="twitter-{{this.model.id}}"></div>
            <icon classes="editUrl" iconName="fa-edit" (click)="edit()"></icon>
        </div>
    `,
    styles: [`
        icon.editUrl {
            position: absolute;
            right: 5px;
            top: 5px;
            cursor: pointer;
            opacity: 0.3;
        }
    `]
})
export class TwitterBlockFormComponent extends AbstractContentBlockFormComponent<TwitterBlock> implements OnInit {
    constructor(snackBarService: SnackBarService) {
        super(snackBarService);
    }

    public editMode = true;

    private _statusIdRegex = /\/(.*)\/status(es)?\/(\d+)/;

    protected _getFields(): Array<BlockFieldDescriptor> {
        return [new BlockFieldDescriptor('tweetUrl', [Validators.required, CustomValidators.url], 'data.tweetUrl')];
    }

    public ngOnInit(): void {
        this.model.data.tweetUrl = 'https://twitter.com/' + this.model.data.tweetAuthor + '/status/' + this.model.data.tweetId;
        super.ngOnInit();
    }

    public isEmpty(): boolean {
        return this.model.isEmpty();
    }

    protected _afterInit(): void {
        super._afterInit();
        if (!this.isEmpty()) {
            this.editMode = false;
            setTimeout(() => {
                this._render();
            }, 10);
        }
        this.form.onChange.subscribe((change: FieldInputChange) => {
            if (change.key === this.getFieldName('tweetUrl')) {

                const info = this._getTweetInfo(change.newValue);
                if (info !== null) {
                    this.model.data.tweetId = info.id;
                    this.model.data.tweetAuthor = info.author;
                    this.editMode = false;
                    setTimeout(() => {
                        this._render();
                    }, 10);
                }
            }
        });
    }

    private _getTweetInfo(uri: string): TweetInfo | null {
        const parsed = url.parse(uri);
        if (parsed.host !== 'twitter.com') {
            return null;
        }

        if (!parsed.path) {
            return null;
        }

        if (parsed.path.indexOf('status') === -1) {
            return null;
        }

        const match = this._statusIdRegex.exec(parsed.path);
        if (match === null) {
            return null;
        }

        return new TweetInfo(match[3], match[1]);
    }

    private _render(): void {
        (<any>window).twttr.ready(twitter => {
            twitter.widgets.createTweet(
                this.model.data.tweetId + '',
                <HTMLElement>document.getElementById('twitter-' + this.model.id),
                {
                    theme: 'light'
                }
            );
        });
    }

    public edit(): void {
        this.editMode = true;
    }
}

class TweetInfo {
    public constructor(public id: string, public author: string) {

    }
}
