import {ListTableColumnType} from './ListEnums';
import {ListTableColumn} from './ListTableColumn';
import {AbstractEntity} from "../models/AbstractEntity";

export class AuthorTableColumn<T extends AbstractEntity> extends ListTableColumn<T> {
    constructor(key: string, title: string) {
        super(key, title, ListTableColumnType.Author);
    }
}
