import {AbstractFormComponent} from './AbstractFormComponent';
import {AbstractSiteEntity} from "../models/AbstractSiteEntity";
import {AbstractBaseService} from "../http/AbstractBaseService";

export abstract class AbstractSiteEntityFormComponent<TModel extends AbstractSiteEntity,
    TService extends AbstractBaseService<TModel>> extends AbstractFormComponent<TModel, TService> {
}
