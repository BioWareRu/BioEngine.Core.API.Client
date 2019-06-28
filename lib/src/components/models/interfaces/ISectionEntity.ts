import {IEntity} from './IEntity';

export interface ISectionEntity extends IEntity {
    sectionIds: Array<string>;
    tagIds: Array<string>;
    sections: Array<any>;
    tags: Array<any>;
}
