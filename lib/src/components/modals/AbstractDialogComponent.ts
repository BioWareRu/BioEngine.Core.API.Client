import {Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export abstract class AbstractDialogComponent<T> {
    public dialogRef: MatDialogRef<AbstractDialogComponent<T>>;

    protected constructor(
        @Inject(MAT_DIALOG_DATA) public data: T) {
    }

    hideDialog(): void {
        this.dialogRef.close();
    }
}
