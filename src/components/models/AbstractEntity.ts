import {IEntity} from "./interfaces/IEntity";
import {Properties} from "../../models/Properties";

export abstract class AbstractEntity implements IEntity {
    public id: any = undefined;
    public title: string;
    public url: string;
    public dateAdded: string;
    public dateUpdated: string;
    public propertiesGroups: Array<Properties> = [];
}
