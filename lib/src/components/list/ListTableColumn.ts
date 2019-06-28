import {ListTableColumnType} from './ListEnums';
import {ListTableColumnAction} from './ListTableColumnAction';
import Dictionary from "../Dictionary";
import {AbstractEntity} from "../models/AbstractEntity";

export class ListTableColumn<T extends AbstractEntity> {

    constructor(key: string, title: string, type: ListTableColumnType = ListTableColumnType.Text) {
        this.key = key;
        this.title = title;
        this.type = type;
    }

    public title: string;
    public key: string;
    public sortable: boolean;
    public type: ListTableColumnType;
    public disabled: boolean;
    public hidden = false;
    public doClick: (model: T) => any;
    private _actionGenerators: Array<(model: T) => ListTableColumnAction<T>[]> = [];
    private _getter: (model: T) => {};
    private _linkGetter: (model: T) => {};

    private _actions = new Dictionary<string, ListTableColumnAction<T>[]>();

    public setSortable(sortable: boolean = true): ListTableColumn<T> {
        this.sortable = sortable;

        return this;
    }

    public setCustomGetter(getter: (model: T) => {}): ListTableColumn<T> {
        this._getter = getter;

        return this;
    }

    public setLinkGetter(linkGetter: (model: T) => {}): ListTableColumn<T> {
        this.type = ListTableColumnType.Link;
        this._linkGetter = linkGetter;

        return this;
    }

    public addActions(actions: (model: T) => ListTableColumnAction<T>[]): ListTableColumn<T> {
        this.type = ListTableColumnType.Actions;
        this._actionGenerators.push(actions);

        return this;
    }

    public addAction(action: ListTableColumnAction<T>): ListTableColumn<T> {
        this.type = ListTableColumnType.Actions;
        this._actionGenerators.push(() => [action]);

        return this;
    }

    public getActions(model: T): ListTableColumnAction<T>[] {
        if (!this._actions.hasKey(model.id)) {
            const actions: ListTableColumnAction<T>[] = [];
            this._actionGenerators.forEach(generator => {
                generator(model).forEach(action => {

                    actions.push(action);
                });
            });
            this._actions.set(model.id, actions);
        }
        return <[]>this._actions.get(model.id);
    }

    public setDisabled(disabled: boolean): ListTableColumn<T> {
        this.disabled = disabled;

        return this;
    }

    public getValue(model: T): any {
        if (this._getter) {
            return this._getter(model);
        }

        return model.hasOwnProperty(this.key) ? model[this.key] : null;
    }

    public getLink(model: T): any {
        if (this._linkGetter) {
            return this._linkGetter(model);
        }

        return null;
    }

    public click(model: T): void {
        this.doClick(model);
    }

    public setClick(click: (model: T) => any): ListTableColumn<T> {
        this.type = ListTableColumnType.ActionLink;
        this.doClick = click;

        return this;
    }

    public setHidden(hidden: boolean): ListTableColumn<T> {
        this.hidden = hidden;

        return this;
    }
}
