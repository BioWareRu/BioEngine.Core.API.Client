import {EventEmitter} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {BioFormControl} from './BioFormControl';
import {FieldInputChange} from './FieldInputChange';

export class Form {
    public success = false;
    public inProgress = false;
    public hasErrors = false;
    public hasChanges = false;
    public formGroup: FormGroup = new FormGroup({});

    protected _controlsByProperty: { [p: string]: BioFormControl } = {};

    public onChange: EventEmitter<FieldInputChange> = new EventEmitter<FieldInputChange>();

    public addControl(name: string, control: BioFormControl, property: string): void {
        this.formGroup.addControl(name, control);
        this._controlsByProperty[property] = control;
    }

    public getControlByProperty(property: string): BioFormControl {
        return this._controlsByProperty[property];
    }

    updateControlValue(name: string): void {
        (<BioFormControl>this.formGroup.controls[name]).reloadValue();
    }

    public registerChange(change: FieldInputChange): void {
        this.hasChanges = true;
        this.hasErrors = false;
        this.success = false;
        this.onChange.emit(change);
    }
}
