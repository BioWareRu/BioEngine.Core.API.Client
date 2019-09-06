import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {RestClient} from "../components/http/HttpClient";
import {StorageNode} from "../components/storage/StorageNode";

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    public constructor(protected _httpClient: RestClient) {
    }

    public get(path: string): Observable<Array<StorageNode>> {
        return this._httpClient
            .get('Storage', {
                path
            })
            .pipe(map(res => <Array<StorageNode>>res));
    }

    public upload(file: File, prefix: string): Observable<StorageNode> {
        return this._httpClient
            .post('Storage/upload/', file, {name: file.name, path: prefix})
            .pipe(map(data => <StorageNode>data));
    }

    public delete(path: string): Observable<boolean> {
        return this._httpClient
            .delete('Storage', {
                path
            })
            .pipe(map(res => <boolean>res));
    }
}


