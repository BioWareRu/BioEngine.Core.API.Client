import {Injectable} from '@angular/core';
import {CacheProvider} from "../components/http/CacheProvider";
import {Tag} from "../models/Tag";
import {TagsService} from "../services/TagsService";

@Injectable({
    providedIn: 'root'
})
export class TagsCacheProvider extends CacheProvider<Tag> {
    constructor(service: TagsService) {
        super(service);
    }
}
