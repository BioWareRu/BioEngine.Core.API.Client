import {IContentEntity} from "./interfaces/IContentEntity";
import {ISectionEntity} from "./interfaces/ISectionEntity";
import {User} from "../../models/User";
import {AbstractEntity} from "./AbstractEntity";
import {PublicUrl} from "./interfaces/IRoutable";
import {AbstractBaseContentBlock} from "./AbstractBaseContentBlock";


export abstract class AbstractContentItem extends AbstractEntity implements IContentEntity, ISectionEntity {
    public sectionIds: string[];
    public tagIds: string[];
    public sections: any[];
    public tags: any[];
    public blocks: AbstractBaseContentBlock[];
    public isPublished: boolean;
    public datePublished: string;
    public siteIds: string[];
    public sites: any[];
    public publicUrls: PublicUrl[];
    public authorId: number;
    public author: User;
}
