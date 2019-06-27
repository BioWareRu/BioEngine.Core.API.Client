import {Injectable} from '@angular/core';
import {CacheProvider} from "../components/http/CacheProvider";
import {Site} from "../models/Site";
import {SitesService} from "../services/SitesService";

@Injectable({
    providedIn: 'root'
})
export class SitesCacheProvider extends CacheProvider<Site> {
    constructor(service: SitesService) {
        super(service);
    }
}
