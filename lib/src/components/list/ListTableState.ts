import {Filter} from "../http/Filter";

export class ListTableState {
    public constructor(public currentPage: number, public itemsPerPage: number, public sort: string | null, public filter: Filter | null) {
    }
}