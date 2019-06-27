import {PropertiesElementType} from './PropertiesElementType';
import {PropertiesElementValue} from './PropertiesElementValue';

export class PropertiesElement {
    public name: string;
    public key: string;
    public values: Array<PropertiesElementValue>;
    public type: PropertiesElementType;
    public isRequired: boolean;
}
