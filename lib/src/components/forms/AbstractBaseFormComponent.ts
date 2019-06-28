import {HttpErrorResponse} from '@angular/common/http';
import {HostListener, Input} from '@angular/core';
import {AbstractControlOptions, ValidatorFn} from '@angular/forms';
import {SnackBarMessage} from '../snacks/SnackBarMessage';
import {SnackBarService} from '../snacks/SnackBarService';
import {BioFormControl} from './BioFormControl';
import {Form} from './Form';
import {RestResult} from "../http/RestResult";

export abstract class AbstractBaseFormComponent {
    @Input()
    form: Form;
    public formLoaded = false;
    constructor(protected _snackBarService: SnackBarService) {
    }
    initForm(): void {
        this.form = this.form || new Form();
        this._constructForm();
        this.formLoaded = true;
    }
    @HostListener('window:beforeunload', ['$event'])
    checkChanges($event): void {
        if (this.form.hasChanges) {
            $event.returnValue = 'Форма не была сохранена. Данные будут потеряны!';
        }
    }
    registerFormControl(name: string, validatorOrOpts?: ValidatorFn | Array<ValidatorFn> | AbstractControlOptions | null, property: string | null = ''): void {
        if (!property) {
            property = name;
        }
        const control = new BioFormControl(this.form, name, this._getModel(), property, validatorOrOpts);
        this.form.addControl(name, control, property);
    }
    protected abstract _constructForm(): void;
    protected _handleSubmitError(response: HttpErrorResponse): void {
        if (response.status === 422) {
            const data = <RestResult>response.error;
            data.errors.forEach(error => {
                const control = this.form.getControlByProperty(error.field);
                if (control != null) {
                    control.setServerError(error.message);
                }
            });
            this._snackBarService.error(new SnackBarMessage('Ошибка валидации', 'Произошла ошибка валидации, проверьте заполнение формы'));
        }
    }
    protected _afterInit(): void {
    }
    public loadFormData(): void {
        this.initForm();
        this._afterInit();
    }
    protected abstract _getModel(): any;
}
