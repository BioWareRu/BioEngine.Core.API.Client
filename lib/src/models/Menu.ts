import {MenuItem} from './MenuItem';
import {AbstractSiteEntity} from "../components/models/AbstractSiteEntity";

export class Menu extends AbstractSiteEntity {
    public items: Array<MenuItem> = [];
}
