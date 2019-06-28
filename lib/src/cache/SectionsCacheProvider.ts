import {Injectable} from '@angular/core';
import {AbstractSection} from "../components/models/AbstractSection";
import {CacheProvider} from "../components/http/CacheProvider";
import {SectionsService} from "../services/SectionsService";

@Injectable({
    providedIn: 'root'
})
export class SectionsCacheProvider extends CacheProvider<AbstractSection> {
    constructor(service: SectionsService) {
        super(service);
    }
}
