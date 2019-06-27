import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {InputFile} from 'ngx-input-file';
import {forkJoin, Observable} from 'rxjs';
import {SnackBarMessage} from '../../snacks/SnackBarMessage';
import {SnackBarService} from '../../snacks/SnackBarService';
import {AbstractFormInput} from './AbstractFormInput';
import {IBaseServiceWithUpload} from "../../http/IBaseServiceWithUpload";
import {StorageItem} from "../../storage/StorageItem";

@Component({
    selector: 'upload-input',
    templateUrl: './UploadInputComponent.html'
})
export class UploadInputComponent extends AbstractFormInput implements OnInit {
    @Input() public types: Array<string> = [];
    @Input() public multiple: boolean;
    @Input() public displayMode = 'images';
    @Input() public service: IBaseServiceWithUpload;
    @ViewChild('fileInput', { static: false }) fileInput;
    protected _items: Array<StorageItem> = [];
    private _uploadControl: FormControl;

    public constructor(private readonly _snackBarService: SnackBarService) {
        super();
    }

    ngOnInit(): void {
        super.ngOnInit();
        this._uploadControl = new FormControl();
        this.inputFormGroup.controls[this.inputFieldName + 'upload'] = this._uploadControl;
        this._generateItems();
    }

    delete(file: InputFile): void {
        if (!this.multiple) {
            this.control.patchValue(null);
        } else {
            let values = <Array<StorageItem>>this.control.value;
            values = values.filter(item => {
                return item.publicUri !== file.link;
            });
            this.control.patchValue(values);
        }
        this._generateItems();
    }

    processFiles($event: InputFile): void {
        if ($event.file) {
            const queue: Observable<StorageItem>[] = [];
            queue.push(this.service.upload($event.file));
            this._processUpload(queue);
        }
    }

    private _generateItems(): void {
        const values: any[] = [];
        this._items = [];
        if (this.control.value !== null) {
            if (Array.isArray(this.control.value)) {
                if (this.control.value.length > 0) {
                    this._items = this.control.value;
                }
            } else {
                this._items = [this.control.value];
            }
        }
        this._items.forEach(item => {
            values.push({
                link: item.publicUri,
                preview: this.displayMode === 'images' ? item.publicUri : null,
                file: this.displayMode !== 'images' ? { name: item.fileName } : null
            });
        });
        this._uploadControl.setValue(values);
    }

    private _processUpload(queue: Array<Observable<StorageItem>>): void {
        this._snackBarService.info(
            new SnackBarMessage('Загрузка файлов', 'Загрузка файлов в процессе')
        );
        forkJoin(queue).subscribe(results => {
            if (this.multiple) {
                this._items = this._items.concat(results);
                this.control.patchValue(this._items);
            } else {
                const item = results[0];
                this._items = [item];
                this.control.patchValue(item);
            }
            this._snackBarService.success(
                new SnackBarMessage('Загрузка файлов', 'Загрузка файлов успешно завершена')
            );
        });
    }
}
