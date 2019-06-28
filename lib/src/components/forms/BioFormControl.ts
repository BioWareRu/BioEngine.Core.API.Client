import {EventEmitter} from '@angular/core';
import {AbstractControlOptions, AsyncValidatorFn, FormControl, ValidatorFn} from '@angular/forms';
import * as objectPath from 'object-path';
import {Form} from './Form';
import {FieldInputChange} from './FieldInputChange';

export class BioFormControl extends FormControl {
    public serverErrors: Array<string> = [];
    public onErrorsChanged: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        private readonly _form: Form,
        private readonly _name: string,
        private readonly _model: any,
        private readonly _property: string,
        validatorOrOpts?: ValidatorFn | Array<ValidatorFn> | AbstractControlOptions | null,
        asyncValidator?: AsyncValidatorFn | Array<AsyncValidatorFn> | null
    ) {
        super('', validatorOrOpts, asyncValidator);
        this.setValue(objectPath.get(this._model, this._property));
        this.valueChanges.subscribe(value => this.setModelValue(value));
    }

    public setModelValue(value: any): void {
        const oldValue = objectPath.get(this._model, this._property);
        if (value !== oldValue) {
            objectPath.set(this._model, this._property, value);
            this.serverErrors = [];
            this.onErrorsChanged.emit();
            this._form.registerChange(new FieldInputChange(this._name, oldValue, value));
        }
    }

    public getValue(): any {
        return objectPath.get(this._model, this._property);
    }

    public reloadValue(): void {
        this.setValue(objectPath.get(this._model, this._property));
    }

    public setServerError(error: string): void {
        this.serverErrors.push(error);
        this.setErrors({ server: true });
        this.onErrorsChanged.emit();
    }
}
