import {Type} from '@angular/core';
import {ContentBlockItemType} from "./ContentBlockItemType";
import {Icon} from "../components/icon/Icon";

export class BlockConfig {
    constructor(public type: ContentBlockItemType, public typeClass: Type<any>, public title: string, public icon: Icon, public formComponent: Type<any>) {
    }
}
