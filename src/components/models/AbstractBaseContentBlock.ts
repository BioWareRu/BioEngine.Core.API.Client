import {Icon} from '../icon/Icon';
import {ContentBlockItemType} from '../../blocks/ContentBlockItemType';
import {AbstractEntity} from './AbstractEntity';

export abstract class AbstractBaseContentBlock extends AbstractEntity {
    public abstract type: ContentBlockItemType;
    public position: number;
    public inFocus = false;
    public abstract icon: Icon;
    public abstract isEmpty(): boolean;
}
