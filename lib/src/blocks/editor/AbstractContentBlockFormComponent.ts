import {Input, OnDestroy, OnInit} from '@angular/core';


import {BlocksManager} from '../BlocksManager';
import {BlockFieldDescriptor} from './BlockFieldDescriptor';
import {AbstractBaseContentBlock} from "../../components/models/AbstractBaseContentBlock";
import {AbstractSimpleFormComponent} from "../../components/forms/AbstractSimpleFormComponent";

export abstract class AbstractContentBlockFormComponent<TBlock extends AbstractBaseContentBlock>
    extends AbstractSimpleFormComponent<TBlock>
    implements OnInit, OnDestroy {
    @Input()
    public blocksManager: BlocksManager;

    ngOnDestroy(): void {
        this._getFields().forEach(field => {
            this.form.formGroup.removeControl(this.getFieldName(field.name));
        });
    }

    public getFieldName(field: string): string {
        return `${field}${this.model.id}`;
    }

    protected _constructForm(): void {
        this._getFields().forEach(element => {
            this.registerFormControl(
                this.getFieldName(element.name),
                element.validators,
                element.property
            );
        });
    }

    protected abstract _getFields(): Array<BlockFieldDescriptor>;

    public abstract isEmpty(): boolean;

    protected _afterInit(): void {
        if (this.model.inFocus) {
            this._setFocus();
        }
    }

    protected _setFocus(): void {
        return;
    }
}


