import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AbstractFormInput} from './AbstractFormInput';
import {SelectGroup} from './SelectGroup';
import {SelectOption} from './SelectOption';

@Component({
    selector: 'select-input',
    templateUrl: './SelectInputComponent.html'
})
export class SelectInputComponent extends AbstractFormInput implements OnInit {
    public groups: Array<SelectGroup> = [];
    @Input() public options: Array<any> | Observable<any>;
    @Input() public groupField: string | null = '';
    @Input() public titleField = 'title';
    @Input() public valueField = 'value';
    @Input() public isMultiple = false;

    public ngOnInit(): void {
        super.ngOnInit();
        if (this.groupField === null) {
            this.groups.push(new SelectGroup());
        }
        if (Array.isArray(this.options)) {
            this._buildGroups(this.options);
        } else {
            this.options.subscribe(data => {
                this._buildGroups(data);
            });
        }
    }

    private _buildGroups(options: Array<any>): void {
        options.forEach(option => {
            const selectOption = new SelectOption();
            selectOption.title = option[this.titleField];
            selectOption.value = option[this.valueField];
            if (this.groupField === null) {
                this.groups[0].options.push(selectOption);
            } else {
                let group: SelectGroup | null = null;
                const groupTitle = option[this.groupField];
                this.groups.forEach(selectGroup => {
                    if (selectGroup.title === groupTitle) {
                        group = selectGroup;
                    }
                });
                if (group === null) {
                    group = new SelectGroup();
                    group.title = groupTitle;
                    this.groups.push(group);
                }
                group.options.push(selectOption);
            }
        });
    }
}
