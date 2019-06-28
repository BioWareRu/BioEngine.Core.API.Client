import {IEntity} from './IEntity';
import {Site} from "../../../models/Site";

export class PublicUrl {
    url: string;
    site: Site;
}

export interface IRoutable extends IEntity {
    publicUrls: PublicUrl[];
}
