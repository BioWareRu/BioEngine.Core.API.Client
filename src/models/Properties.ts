import {PropertiesFrequency} from './PropertiesFrequency';
import {PropertiesElement} from './PropertiesElement';

export class Properties {
    public name: string;
    public key: string;
    public isEditable: boolean;
    public frequency: PropertiesFrequency;

    public properties: Array<PropertiesElement> = [];
}
