import {Input, OnInit} from '@angular/core';
import {AbstractBaseFormComponent} from './AbstractBaseFormComponent';

export abstract class AbstractSimpleFormComponent<TModel> extends AbstractBaseFormComponent implements OnInit {
    @Input()
    public model: TModel;
    ngOnInit(): void {
        this.loadFormData();
    }
    protected _getModel(): TModel {
        return this.model;
    }
}
