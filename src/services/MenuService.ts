import {Injectable} from '@angular/core';
import {AbstractBaseService} from "../components/http/AbstractBaseService";
import {RestClient} from "../components/http/HttpClient";
import {Menu} from "../models/Menu";

@Injectable()
export class MenuService extends AbstractBaseService<Menu> {

  constructor(httpClient: RestClient) {
    super(httpClient);
  }

  protected _getResource(): string {
    return 'menu';
  }
}
