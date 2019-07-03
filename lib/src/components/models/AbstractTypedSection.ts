import {AbstractSection} from './AbstractSection';
import {ITypedEntity} from "./interfaces/ITypedEntity";
import {AbstractSectionData} from "./AbstractSectionData";

export abstract class AbstractTypedSection<TData extends AbstractSectionData> extends AbstractSection implements ITypedEntity<TData> {
    public typeTitle: string;
    public data: TData;
}
