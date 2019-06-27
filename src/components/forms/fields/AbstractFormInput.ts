import {Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {BioFormControl} from '../BioFormControl';
import {MatFormFieldAppearance} from '@angular/material/form-field';
import {Icon} from "../../icon/Icon";

export abstract class AbstractFormInput implements OnInit {
    public control: BioFormControl;

    @Input() public inputFieldName: string;
    @Input() public inputLabel: string;
    @Input() public inputFormGroup: FormGroup;
    @Input() public inputAppearance: MatFormFieldAppearance = 'standard';
    @Input() public inputFxFlex = 100;
    @Input() public inputPlaceholder: string | null = '';
    @Input() public inputIcon: Icon | null = null;
    public errors: Array<string> = [];

    ngOnInit(): void {
        this.control = <BioFormControl>this.inputFormGroup.get(this.inputFieldName);
        if (!this.inputPlaceholder) {
            this.inputPlaceholder = this.inputLabel;
        }
        this.control.valueChanges.subscribe(() => {
            this._buildErrors();
        });
        this.control.onErrorsChanged.subscribe(() => this._buildErrors());
    }

    protected _buildErrors(): void {
        const errors: string[] = [];

        if (this.control && (!this.control.valid || this.control.serverErrors.length > 0)) {
            if (this.control.errors) {
                if (this.control.errors['required']) {
                    errors.push('Поле обязательно для заполнения');
                }
                if (this.control.errors['url']) {
                    errors.push('Значение должно являться корректным URL');
                }
            }
            if (this.control.serverErrors.length > 0) {
                this.control.serverErrors.forEach(error => errors.push(error));
            }
        }
        this.errors = errors;
    }
}
