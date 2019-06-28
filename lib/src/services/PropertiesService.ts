import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AbstractBaseService} from "../components/http/AbstractBaseService";
import {RestClient} from "../components/http/HttpClient";
import {PropertiesOption} from "../models/PropertiesOption";
import {AbstractListResult} from "../components/list/AbstractListResult";

@Injectable()
export class PropertiesService extends AbstractBaseService<PropertiesOption> {
    constructor(httpClient: RestClient) {
        super(httpClient);
    }

    public getOptions(groupKey: string, propertyKey: string): Observable<Array<PropertiesOption>> {
        return this._httpClient.get(this._getResource(), {
            setKey: groupKey,
            propertyKey
        }).pipe(map((result: AbstractListResult<PropertiesOption>) => {
            return result.data;
        }));
    }

    protected _getResource(): string {
        return 'properties';
    }
}
