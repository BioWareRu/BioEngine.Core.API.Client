import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IBaseServiceCreatable} from "../components/http/IBaseServiceCreatable";
import {AbstractBaseService} from "../components/http/AbstractBaseService";
import {SaveModelResponse} from "../components/http/SaveModelResponse";
import {RestClient} from "../components/http/HttpClient";
import {Tag} from "../models/Tag";

@Injectable()
export class TagsService extends AbstractBaseService<Tag> implements IBaseServiceCreatable<Tag> {

    constructor(httpClient: RestClient) {
        super(httpClient);
    }

    public create(title: string): Observable<SaveModelResponse<Tag>> {
        const tag = new Tag();
        tag.title = title;

        return this.add(tag);
    }

    protected _getResource(): string {
        return 'tags';
    }
}
