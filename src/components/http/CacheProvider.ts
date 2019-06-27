import {BehaviorSubject, Observable} from 'rxjs';
import {AbstractBaseService} from './AbstractBaseService';
import {Filter} from './Filter';
import {FilterOperator} from './FilterOperator';
import Dictionary from "../Dictionary";
import {AbstractEntity} from "../models/AbstractEntity";

export abstract class CacheProvider<TModel extends AbstractEntity> {
    protected constructor(private readonly _service: AbstractBaseService<TModel>) {
    }

    private readonly _cache = new Dictionary<string, TModel>();
    private readonly _queue = new Dictionary<string, BehaviorSubject<Dictionary<string, TModel>>>();

    public get(ids: Array<string>): Observable<Dictionary<string, TModel>> {
        const models = new Dictionary<string, TModel>();
        const result = new BehaviorSubject<Dictionary<string, TModel>>(models);
        if (!ids) {
            return result.asObservable();
        }
        const key = ids.join('|');
        if (this._queue.hasKey(key)) {
            // @ts-ignore
            return this._queue.get(key).asObservable();
        }

        this._queue.set(key, result);
        const toLoad: string[] = [];
        if (ids) {
            ids.forEach(id => {
                if (this._cache.hasKey(id)) {
                    // @ts-ignore
                    models.set(id, this._cache.get(id));
                } else {
                    toLoad.push(id);
                }
            });
        }

        if (toLoad.length > 0) {
            const filter = Filter.simple('id', FilterOperator.In, ids);
            this._service.getAll(null, null, null, filter).subscribe(res => {
                res.data.forEach(model => {
                    this._cache.set(model.id, model);
                    models.set(model.id, model);
                });
                result.next(models);
                this._queue.remove(key);
            });
        } else {
            result.next(models);
            this._queue.remove(key);
        }

        return result;
    }
}
