import {Injectable} from '@angular/core';
import {AbstractContentEntityService} from "../components/http/AbstractContentEntityService";
import {Post} from "../models/Post";
import {RestClient} from "../components/http/HttpClient";

@Injectable()
export class PostsService extends AbstractContentEntityService<Post> {
    constructor(httpClient: RestClient) {
        super(httpClient);
    }

    protected _getResource(): string {
        return 'posts';
    }
}
