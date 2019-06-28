import {Observable} from 'rxjs';
import {SaveModelResponse} from './SaveModelResponse';
import {IBaseService} from './IBaseService';

export interface IBaseServiceCreatable<T> extends IBaseService<T> {
    create(name: string): Observable<SaveModelResponse<T>>;
}
