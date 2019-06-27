import {Injectable} from '@angular/core';
import {AbstractBaseService} from "../components/http/AbstractBaseService";
import {RestClient} from "../components/http/HttpClient";
import {AbstractSection} from "../components/models/AbstractSection";

@Injectable()
export class SectionsService extends AbstractBaseService<AbstractSection> {

    constructor(httpClient: RestClient) {
        super(httpClient);
    }

    protected _getResource(): string {
        return 'sections';
    }
}
