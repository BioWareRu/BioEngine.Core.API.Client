import {Component, Input} from '@angular/core';
import {BioFormControl} from './BioFormControl';

@Component({
  selector: 'errorsList',
  template: `
    <div [hidden]="control&&control.valid && !control.serverErrors">
      <div *ngIf="control&&control.errors">
        <div *ngIf="control.errors['required']" class="form-text control-error">
          Поле обязательно для заполнения
        </div>
        <div *ngIf="control.errors['url']" class="form-text control-error">
          Значение должно являться корректным URL
        </div>
      </div>
      <div *ngIf="control">
        <div *ngFor="let e of control.serverErrors" class="form-text control-error">
          {{ e }}
        </div>
      </div>
    </div>
  `
})
export class ErrorsListComponent {
  @Input() public control: BioFormControl;
}
