import {Component} from '@angular/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {AbstractFormInput} from './AbstractFormInput';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

export const BIO_DATE_FORMATS = {
    parse: {
        dateInput: 'LL'
    },
    display: {
        dateInput: 'LL',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
    }
};

@Component({
    selector: 'date-picker-input',
    templateUrl: './DatePickerInputComponent.html',
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: BIO_DATE_FORMATS }
    ]
})
export class DatePickerInputComponent extends AbstractFormInput {
}
