import {ListTableColumnActionType} from './ListEnums';
import {Icon} from "../icon/Icon";

export class ListTableColumnAction<T> {
    public icon: Icon;
    public title: string;
    public type: ListTableColumnActionType;
    public types = ListTableColumnActionType;
    public url: string;
    public doClick: (model: T) => any;

    constructor(
        title: string,
        icon: Icon,
        type: ListTableColumnActionType = ListTableColumnActionType.Click
    ) {
        this.title = title;
        this.icon = icon;
        this.type = type;
    }

    public setClick(click: (model: T) => any): ListTableColumnAction<T> {
        this.type = ListTableColumnActionType.Click;
        this.doClick = click;

        return this;
    }

    public setExternal(url: string): ListTableColumnAction<T> {
        this.type = ListTableColumnActionType.ExternalLink;
        this.url = url;

        return this;
    }

    public click(model: T): void {
        this.doClick(model);
    }
}
