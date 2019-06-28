import {AbstractContentItem} from './AbstractContentItem';
import {ITypedEntity} from "./interfaces/ITypedEntity";

export abstract class AbstractTypedContentItem<TData> extends AbstractContentItem implements ITypedEntity<TData> {
    public typeTitle: string;
    public data: TData;
}
