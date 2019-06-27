import {Properties} from "../../../models/Properties";

export interface IEntity {
    id: any;
    title: string;
    url: string;
    dateAdded: string;
    dateUpdated: string;

    propertiesGroups: Array<Properties>;
}
