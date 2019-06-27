import {Injectable} from '@angular/core';
import {NotificationComponent} from './NotificationComponent';
import {SnackBarMessage} from './SnackBarMessage';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {
    constructor(public snackBar: MatSnackBar) {
    }

    public show(snackBarMessage: SnackBarMessage, panelClass: string): void {
        const ref = this.snackBar.openFromComponent(NotificationComponent, {
            data: snackBarMessage,
            duration: snackBarMessage.duration,
            panelClass,
            verticalPosition: snackBarMessage.verticalPosition,
            horizontalPosition: snackBarMessage.horizontalPosition
        });
        ref.instance.instance = ref;
    }

    public error(snackBarMessage: SnackBarMessage): void {
        this.show(snackBarMessage, 'panel-warn');
    }

    public success(snackBarMessage: SnackBarMessage): void {
        this.show(snackBarMessage, 'panel-accent');
    }

    public info(snackBarMessage: SnackBarMessage): void {
        this.show(snackBarMessage, 'panel-primary');
    }
}


