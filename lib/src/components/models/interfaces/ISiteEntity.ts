import {IEntity} from './IEntity';

export interface ISiteEntity extends IEntity {
    siteIds: Array<string>;
    sites: Array<any>;
}


