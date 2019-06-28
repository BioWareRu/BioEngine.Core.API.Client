import {Observable} from 'rxjs';
import {StorageItem} from "../storage/StorageItem";

export interface IBaseServiceWithUpload {
    upload(file: File): Observable<StorageItem>;
}
