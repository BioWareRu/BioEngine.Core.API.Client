import {ISiteEntity} from './ISiteEntity';
import {IRoutable} from './IRoutable';
import {AbstractBaseContentBlock} from "../AbstractBaseContentBlock";

export interface IContentEntity extends ISiteEntity, IRoutable {
    blocks: AbstractBaseContentBlock[];
    isPublished: boolean;
    datePublished: string;
}
