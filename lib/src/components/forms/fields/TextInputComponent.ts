import {Component, Input} from '@angular/core';
import {AbstractFormInput} from './AbstractFormInput';

@Component({
    selector: 'text-input',
    templateUrl: './TextInputComponent.html'
})
export class TextInputComponent extends AbstractFormInput {
    @Input() public type = 'text';
}
