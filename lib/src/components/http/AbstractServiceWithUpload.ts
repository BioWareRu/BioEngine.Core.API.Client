import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IBaseServiceWithUpload} from './IBaseServiceWithUpload';
import {AbstractBaseService} from './AbstractBaseService';
import {StorageItem} from "../storage/StorageItem";

export abstract class AbstractServiceWithUpload<T> extends AbstractBaseService<T> implements IBaseServiceWithUpload {
    public upload(file: File): Observable<StorageItem> {
        return this._httpClient
            // @ts-ignore
            .post(this._getResource() + '/upload/', file, { name: file.name })
            .pipe(map(data => <StorageItem>data));
    }
}
