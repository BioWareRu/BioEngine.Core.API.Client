import {Injectable} from '@angular/core';
import {AbstractContentEntityService} from "../components/http/AbstractContentEntityService";
import {RestClient} from "../components/http/HttpClient";
import {Page} from "../models/Page";

@Injectable()
export class PagesService extends AbstractContentEntityService<Page> {

  constructor(httpClient: RestClient) {
    super(httpClient);
  }

  protected _getResource(): string {
    return 'pages';
  }
}
