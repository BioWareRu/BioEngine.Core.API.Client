import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AbstractEntity} from "../models/AbstractEntity";
import {AbstractServiceWithUpload} from "./AbstractServiceWithUpload";
import {IContentEntity} from "../models/interfaces/IContentEntity";

export abstract class AbstractContentEntityService<T extends AbstractEntity & IContentEntity> extends AbstractServiceWithUpload<T> {
    public publish(id: string): Observable<T> {
        return this._httpClient
            .post(this._getResource() + '/publish/' + id, {})
            .pipe(map(res => <T>res));
    }

    public unpublish(id: string): Observable<T> {
        return this._httpClient
            .post(this._getResource() + '/hide/' + id, {})
            .pipe(map(res => <T>res));
    }
}
