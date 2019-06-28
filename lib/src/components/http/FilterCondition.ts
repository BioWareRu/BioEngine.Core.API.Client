import {FilterOperator} from './FilterOperator';

export class FilterCondition {
    constructor(public property: string, public operator: FilterOperator, public value: any) { }
}
