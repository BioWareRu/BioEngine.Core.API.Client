import {AbstractEntity} from './AbstractEntity';
import {ISiteEntity} from "./interfaces/ISiteEntity";

export abstract class AbstractSiteEntity extends AbstractEntity implements ISiteEntity {
    public siteIds: string[];
    sites: any[];
}
