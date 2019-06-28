import {Injectable} from '@angular/core';
import {Site} from "../models/Site";
import {RestClient} from "../components/http/HttpClient";
import {AbstractServiceWithUpload} from "../components/http/AbstractServiceWithUpload";

@Injectable()
export class SitesService extends AbstractServiceWithUpload<Site> {
    constructor(httpClient: RestClient) {
        super(httpClient);
    }

    protected _getResource(): string {
        return 'sites';
    }
}
