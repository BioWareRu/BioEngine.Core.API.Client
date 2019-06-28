import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Filter} from './Filter';
import {RestClient} from './HttpClient';
import {IBaseService} from './IBaseService';
import {AbstractListResult} from '../list/AbstractListResult';
import {SaveModelResponse} from './SaveModelResponse';

export abstract class AbstractBaseService<T> implements IBaseService<T> {
    protected constructor(protected _httpClient: RestClient) {
    }

    public getAll(
        page: number | null = 0,
        perPage: number | null = 10,
        sort: string | null = '',
        filter: Filter | null = null
    ): Observable<AbstractListResult<T>> {
        return this._httpClient
            .get(this._getResource(), {
                limit: perPage || 10,
                offset: page !== null && perPage !== null && page > 0 ? perPage * page : 0,
                order: sort,
                filter: filter === null ? null : filter.toString()
            })
            .pipe(map(res => <AbstractListResult<T>>res));
    }

    public get(id: string): Observable<T> {
        return this._httpClient
            .get(this._getResource() + '/' + id, {})
            .pipe(map(res => <T>res));
    }

    public getNew(): Observable<T> {
        return this._httpClient
            .get(this._getResource() + '/new', {})
            .pipe(map(res => <T>res));
    }

    public add(item: T): Observable<SaveModelResponse<T>> {
        return this._httpClient
            .post(this._getResource(), item)
            .pipe(map(res => <SaveModelResponse<T>>res));
    }

    public update(id: number, item: T): Observable<SaveModelResponse<T>> {
        return this._httpClient
            .put(this._getResource() + '/' + id, item)
            .pipe(map(res => <SaveModelResponse<T>>res));
    }

    public delete(id: number): Observable<boolean> {
        return this._httpClient.delete(this._getResource() + '/' + id).pipe(map(() => true));
    }

    public count(): Observable<number> {
        return this._httpClient
            .get(this._getResource() + '/count', {})
            .pipe(map(res => <number>res));
    }

    protected abstract _getResource(): string;
}

