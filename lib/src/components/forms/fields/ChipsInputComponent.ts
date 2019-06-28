import {ENTER} from '@angular/cdk/keycodes';
import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {AutocompleteInputComponent} from './AutocompleteInputComponent';
import {AbstractFormInput} from './AbstractFormInput';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {ErrorStateMatcher} from '@angular/material/core';
import {IBaseServiceCreatable} from "../../http/IBaseServiceCreatable";

@Component({
    selector: 'chips-input',
    templateUrl: './ChipsInputComponent.html',
    styleUrls: ['./ChipsInputComponent.scss'],
})
export class ChipsInputComponent extends AutocompleteInputComponent implements OnInit {
    @Input() public creatable = false;
    @Input() public removable = true;
    @Input() public selectable = true;
    @Input() public visible = true;
    public inputCtrl = new FormControl();
    @Input() public entitiesService: IBaseServiceCreatable<any> | null = null;
    separatorKeysCodes: Array<number> = [ENTER];
    matcher: ChipsErrorStateMatcher;
    public addInProgress = false;

    ngOnInit(): void {
        this._removeSelectedValues = true;
        this.inputFormGroup.controls[this.inputFieldName + 'input'] = this.inputCtrl;
        super.ngOnInit();
        this.matcher = new ChipsErrorStateMatcher(this);
    }

    protected _getInput(): FormControl {
        return this.inputCtrl;
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.input.nativeElement.value = '';
        this.inputCtrl.setValue(null);
        const values = this.control.value || [];
        values.push(event.option.value);
        this.control.setValue(values);
        this._buildGroups();

    }

    remove(value): void {
        const index = this.control.value.indexOf(value);

        if (index >= 0) {
            this.control.value.splice(index, 1);
            if (this.control.value.length === 0) {
                this.control.setValue(null);
            }
            this._buildGroups();
        }
    }

    add(value): void {
        if (!this.creatable || !value || !value.value) {
            return;
        }
        this.addInProgress = true;
        if (this.entitiesService) {
            this.entitiesService.create(value.value).subscribe(result => {
                let values = this.control.value;
                if (!values) {
                    values = [];
                }
                values.push(result.model[this.valueField]);
                this.control.setValue(values);
                this._values.push(result.model);
                this._buildGroups();
                this._buildLabels();
                this.input.nativeElement.value = '';
                this.addInProgress = false;

            });
        }
    }

    inputClosed(): void {
        this.control.setValue(this.control.value);
    }

    protected _isValueSelected(value: any): boolean {
        return value && this.control.value && Array.isArray(this.control.value) && this.control.value.indexOf(value) > -1;
    }
}

class ChipsErrorStateMatcher extends ErrorStateMatcher {
    constructor(private readonly _input: AbstractFormInput) {
        super();
    }

    public isErrorState(_control: FormControl | null, _form: FormGroupDirective | NgForm | null): boolean {
        return this._input.errors.length > 0;
    }
}
