import {Component, Input} from '@angular/core';
import {AbstractFormInput} from './AbstractFormInput';

@Component({
    selector: 'textarea-input',
    templateUrl: './TextAreaInputComponent.html'
})
export class TextAreaInputComponent extends AbstractFormInput {
    @Input() public autoResize = true;
    @Input() public rows = 6;
}
