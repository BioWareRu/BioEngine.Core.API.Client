import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import Dictionary from '../../Dictionary';
import {AbstractFormInput} from './AbstractFormInput';
import {MatAutocomplete, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {SelectGroup} from './SelectGroup';
import {SelectOption} from './SelectOption';
import {FilterOperator} from "../../http/FilterOperator";
import {Filter} from "../../http/Filter";
import {IBaseService} from "../../http/IBaseService";

@Component({
    selector: 'autocomplete-input',
    templateUrl: './AutocompleteInputComponent.html'
})
export class AutocompleteInputComponent extends AbstractFormInput implements OnInit {
    public groups: Array<SelectGroup> = [];
    @Input() public options: Array<any> | Observable<any>;
    @Input() public entitiesService: IBaseService<any> | null = null;
    @Input() public groupField = '';
    @Input() public titleField = 'title';
    @Input() public valueField = 'value';
    @Input() public type = 'text';
    @ViewChild(MatAutocompleteTrigger, { static: false })
    autoCompleteTrigger: MatAutocompleteTrigger;
    @ViewChild(MatAutocomplete, { static: false }) matAutocomplete: MatAutocomplete;
    @ViewChild('input', { static: false }) input: ElementRef<HTMLInputElement>;
    protected _removeSelectedValues = false;
    protected _labels = new Dictionary<number, string>();
    protected _values: Array<any> = [];
    protected _filter: Filter | null;
    protected _filterValue: string;
    public isInitialized = false;

    public ngOnInit(): void {
        super.ngOnInit();
        if (!this.options && !this.entitiesService) {
            throw new Error('Empty options for field ' + this.inputFieldName);
        }
        this._getInput().valueChanges.pipe(
            startWith(null),
            map((input) => {
                this._filter = null;
                this._filterValue = '';
                if (input && typeof input === 'string') {
                    this._filterValue = input.toLowerCase();
                    this._filter = Filter.simple(this.titleField, FilterOperator.Contains, this._filterValue);
                } else if (this.entitiesService && this.control.value) {
                    if (Array.isArray(this.control.value) && this.control.value.length > 0) {
                        this._filter = Filter.simple(this.valueField, FilterOperator.In, this.control.value);
                    } else if (!Array.isArray(this.control.value) && this.control.value !== '00000000-0000-0000-0000-000000000000') {
                        this._filter = Filter.simple(this.valueField, FilterOperator.Equal, this.control.value);
                    }
                }

                this._prepareData(this._filter);

            })).subscribe();
    }

    protected _getInput(): FormControl {
        return this.control;
    }

    private _prepareData(filter: Filter | null): void {
        if (Array.isArray(this.options)) {
            this._values = this.options;
            this._buildGroups();
            this._buildLabels();
            this.isInitialized = true;
        } else if (this.entitiesService !== null) {
            this._loadEntitiesData(filter);
        } else {
            this.options.subscribe(data => {
                this._values = data;
                this._buildGroups();
                this._buildLabels();
                this.isInitialized = true;
            });
        }
    }

    private _loadEntitiesData(filter: Filter | null): void {
        if (this.entitiesService !== null) {
            this.entitiesService.getAll(0, 10, this.titleField, filter).subscribe(res => {
                this._values = res.data;
                this._buildGroups();
                this._buildLabels();
                this.isInitialized = true;
            });
        }
    }

    // noinspection JSMethodCanBeStatic
    public displayFn(item: any): string | null {
        return item !== null && this._labels && this._labels.hasKey(item)
            ? this._labels.get(item)
            : null;
    }

    protected _buildLabels(): void {
        this._values.forEach(option => {
            this._labels.set(option[this.valueField], option[this.titleField]);
        });
    }

    protected _buildGroups(): void {
        const groups: Array<SelectGroup> = [];
        if (!this.groupField) {
            groups.push(new SelectGroup());
        }
        this._values.forEach(option => {
            const selectOption = new SelectOption();
            selectOption.title = option[this.titleField];
            selectOption.value = option[this.valueField];

            if (
                this._removeSelectedValues &&
                this._isValueSelected(selectOption.value)
            ) {
                return;
            }
            if (
                !this.entitiesService && this._filterValue &&
                selectOption.title.toLowerCase().indexOf(this._filterValue) === -1
            ) {
                return;
            }
            if (!this.groupField) {
                groups[0].options.push(selectOption);
            } else {
                let group: SelectGroup | null = null;
                const groupTitle = option[this.groupField];
                groups.forEach(selectGroup => {
                    if (selectGroup.title === groupTitle) {
                        group = selectGroup;
                    }
                });
                if (group === null) {
                    group = new SelectGroup();
                    group.title = groupTitle;
                    groups.push(group);
                }
                group.options.push(selectOption);
            }
        });
        this.groups = groups;
    }

    protected _isValueSelected(value: any): boolean {
        // noinspection TsLint
        return this.control.value === value;
    }
}


