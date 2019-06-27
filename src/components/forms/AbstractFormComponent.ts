import {EventEmitter, Input} from '@angular/core';
import {Validators} from '@angular/forms';
import {CustomValidators} from 'ngx-custom-validators';
import {SnackBarMessage} from '../snacks/SnackBarMessage';
import {SnackBarService} from '../snacks/SnackBarService';
import {AbstractBaseFormComponent} from './AbstractBaseFormComponent';
import {Observable} from 'rxjs';
import {PropertiesElementType} from "../../models/PropertiesElementType";
import {AbstractBaseService} from "../http/AbstractBaseService";
import {AbstractEntity} from "../models/AbstractEntity";
import {SaveModelResponse} from "../http/SaveModelResponse";
import {Properties} from "../../models/Properties";
import {PropertiesService} from "../../services/PropertiesService";

export abstract class AbstractFormComponent<TModel extends AbstractEntity, TService extends AbstractBaseService<TModel>> extends AbstractBaseFormComponent {
    @Input()
    public model: TModel | null;
    public propertiesElementTypes = PropertiesElementType;
    public modelProperties: Array<Properties> = [];
    public emptyId = '00000000-0000-0000-0000-000000000000';

    public onSuccessSave: EventEmitter<SaveModelResponse<TModel>> = new EventEmitter<SaveModelResponse<TModel>>();
    private _isNew = true;

    protected constructor(
        public service: TService,
        protected _propertiesService: PropertiesService,
        snackBarService: SnackBarService
    ) {
        super(snackBarService);
    }

    buildPropertiesForm(): any {
        if (this.model && this.model.propertiesGroups) {
            this.model.propertiesGroups.forEach((propertiesSet, groupIndex) => {
                if (!propertiesSet.isEditable) {
                    return;
                }
                propertiesSet.properties.forEach((prop, propIndex) => {
                    prop.values.forEach((val, valIndex) => {
                        const fieldProperty = `propertiesGroups.${groupIndex}.properties.${propIndex}.values.${valIndex}.value`;
                        let fieldName = propertiesSet.key + prop.key;
                        if (val.siteId) {
                            fieldName += val.siteId;
                        }
                        const validators: any[] = [];
                        if (prop.isRequired) {
                            validators.push(Validators.required);
                        }
                        switch (prop.type) {
                            case PropertiesElementType.Url:
                                validators.push(CustomValidators.url);
                                break;
                        }
                        this.registerFormControl(fieldName, validators, fieldProperty);
                    });
                });
                this.modelProperties.push(propertiesSet);
            });
        }
    }

    public propertiesOptions(groupKey: string, propertyKey: string): Observable<any> {
        return this._propertiesService.getOptions(groupKey, propertyKey);
    }

    public save(): void {
        this.form.success = false;
        this.form.inProgress = true;
        let result;
        if (this._isNew) {
            result = this._doAdd();
        } else {
            result = this._doUpdate();
        }
        result.subscribe(
            (saveResult: SaveModelResponse<TModel>) => {
                this.form.hasChanges = false;
                this.form.success = true;
                this.onSuccessSave.emit(saveResult);
                this._snackBarService.success(
                    new SnackBarMessage('Успех!', 'Сохранение прошло успешно.')
                );
                this.form.inProgress = false;
            },
            e => {
                this.form.hasErrors = true;
                this._handleSubmitError(e);
                this.form.inProgress = false;
            }
        );
    }

    updateControlValue(name: string): void {
        this.form.updateControlValue(name);
    }

    protected _doAdd(): Observable<SaveModelResponse<TModel>> {
        if (!this.model) {
            throw new Error('Cannot add empty model');
        }
        return this.service.add(this.model);
    }

    protected _doUpdate(): Observable<SaveModelResponse<TModel>> {
        if (!this.model) {
            throw new Error('Cannot update empty model');
        }
        return this.service.update(this.model.id, this.model);
    }

    public loadFormData(model: TModel | null = null): void {
        this.model = model;
        if (this.model && this.model.id !== this.emptyId) {
            this._isNew = false;
        }
        this.initForm();
        this.buildPropertiesForm();
        this._afterInit();
    }

    protected _getModel(): any {
        return this.model;
    }
}
