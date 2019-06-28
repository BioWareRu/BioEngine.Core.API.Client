import {Type} from '@angular/core';
import {Icon} from "../components/icon/Icon";

export class BlockConfig {
    constructor(public type: string, public typeClass: Type<any>, public title: string, public icon: Icon, public formComponent: Type<any>) {
    }
}
