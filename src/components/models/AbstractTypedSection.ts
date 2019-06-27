import {AbstractSection} from './AbstractSection';
import {ITypedEntity} from "./interfaces/ITypedEntity";

export abstract class AbstractTypedSection<TData> extends AbstractSection implements ITypedEntity<TData> {
    public typeTitle: string;
    public data: TData;
}
