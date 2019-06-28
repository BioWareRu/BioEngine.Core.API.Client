import {AbstractSiteEntity} from './AbstractSiteEntity';
import {IContentEntity} from "./interfaces/IContentEntity";
import {PublicUrl} from "./interfaces/IRoutable";
import {AbstractBaseContentBlock} from "./AbstractBaseContentBlock";

export abstract class AbstractSection extends AbstractSiteEntity implements IContentEntity {
    public blocks: AbstractBaseContentBlock[];
    public isPublished: boolean;
    public datePublished: string;
    public publicUrls: PublicUrl[];
    public type: string;
}
