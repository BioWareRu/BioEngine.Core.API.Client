import {ComponentType} from '@angular/cdk/portal';
import {Injectable, TemplateRef} from '@angular/core';
import {ConfirmationDialogComponent} from './ConfirmationDialogService';
import {ConfirmationDialogComponentData} from './ConfirmationDialogComponentData';
import {AbstractDialogComponent} from './AbstractDialogComponent';
import {DialogConfig} from './DialogConfig';
import {MatDialog} from '@angular/material/dialog';

@Injectable({
    providedIn: 'root'
})
export class DialogService {
    constructor(public dialog: MatDialog) {
    }

    public show<T extends AbstractDialogComponent<TData>, TData>(
        dialogComponent: ComponentType<T> | TemplateRef<T>,
        data: TData,
        configure: ((config: DialogConfig) => void) | null = null
    ): T {
        const config = new DialogConfig();
        if (configure !== null) {
            configure(config);
        }
        config.data = data;
        const dialogRef = this.dialog.open<T>(dialogComponent, config);
        dialogRef.componentInstance.dialogRef = dialogRef;

        return dialogRef.componentInstance;
    }

    public confirm(
        title: string,
        text: string,
        confirmText: string = 'Да',
        cancelText: string = 'Нет'
    ): ConfirmationDialogComponent {
        return this.show(
            ConfirmationDialogComponent,
            new ConfirmationDialogComponentData(title, text, confirmText, cancelText)
        );
    }
}
