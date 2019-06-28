import {Icon} from '../icon/Icon';
import {AbstractEntity} from './AbstractEntity';

export abstract class AbstractBaseContentBlock extends AbstractEntity {
    public abstract type: string;
    public position: number;
    public inFocus = false;
    public abstract icon: Icon;
    public abstract isEmpty(): boolean;
}
