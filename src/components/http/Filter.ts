import {FilterConditionsGroup} from './FilterConditionsGroup';
import {FilterCondition} from './FilterCondition';
import {FilterOperator} from './FilterOperator';

export class Filter {
    constructor(public groups: Array<FilterConditionsGroup> = []) { }

    public static simple(propertyName: string, operator: FilterOperator, value: any): Filter {
        return new Filter([
            new FilterConditionsGroup([new FilterCondition(propertyName, operator, value)])
        ]);
    }

    public static fromString(filter: string): Filter {
        return new Filter(JSON.parse(decodeURIComponent(atob(filter))));
    }

    public toString(): string {
        return btoa(encodeURIComponent(JSON.stringify(this.groups)));
    }
}
