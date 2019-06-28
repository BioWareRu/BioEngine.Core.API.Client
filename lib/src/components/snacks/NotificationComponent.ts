import {Component, Inject} from '@angular/core';
import {SnackBarMessage} from './SnackBarMessage';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
    selector: 'notification-component',
    templateUrl: 'NotificationComponent.html'
})
export class NotificationComponent {
    public instance: MatSnackBarRef<NotificationComponent>;

    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackBarMessage) {
    }
}
