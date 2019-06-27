import {CollectionViewer} from '@angular/cdk/collections';
import {DataSource} from '@angular/cdk/table';
import {ListTableColumn} from './ListTableColumn';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {AbstractBaseService} from "../http/AbstractBaseService";
import {Filter} from "../http/Filter";
import {AbstractEntity} from "../models/AbstractEntity";
import {EventEmitter} from "@angular/core";

export class ListProvider<T extends AbstractEntity> implements DataSource<T> {
    public items: Subject<Array<T>>;
    public columns: Array<ListTableColumn<T>>;
    public paginator: MatPaginator;
    public sorter: MatSort;
    public dataLoaded = false;

    private _onSortChange = new EventEmitter<string>();
    private _onFilterChange = new EventEmitter<Filter>();
    private _onPageChange = new EventEmitter<number>();

    constructor(
        private readonly _service: AbstractBaseService<T>,
        private _filter: Filter | null = null,
        private _currentPage: number = 0,
        private itemsPerPage: number = 10,
        private _sort: string = '-dateAdded'
    ) {
    }

    public init(): void {
        this.items = new BehaviorSubject<Array<T>>([]);

        this.paginator.page.subscribe(e => {
            this.itemsPerPage = e.pageSize;
            this.changePage(e.pageIndex);
        });
        this.sorter.sortChange.subscribe(e => {
            this.applySort(e.active, e.direction);
        });
        this.paginator.pageSize = this.itemsPerPage;
        if (this._sort !== null) {
            const key = this._sort.replace('-', '');
            const sortDirection: SortDirection = this._sort.indexOf('-') > -1 ? 'desc' : 'asc';
            this.sorter.active = key;
            this.sorter.direction = sortDirection;
        }
        this.load(this._currentPage);

    }

    public load(page?: number): void {
        this.dataLoaded = false;
        page = page ? page : this._currentPage;
        this._service
            .getAll(page, this.paginator.pageSize, this._sort, this._filter)
            .subscribe(res => {
                this.paginator.pageIndex = <number>page;
                this.paginator.length = res.totalItems;
                this.items.next(res.data);
                this.dataLoaded = true;
            });
    }

    public changePage(page: number): void {
        this._onPageChange.emit(page);
    }

    public applySort(column: string, direction: SortDirection): void {
        let sortKey;
        switch (direction) {
            case 'asc':
                sortKey = column;
                break;
            case 'desc':
                sortKey = '-' + column;
                break;
            case '':
                break;
        }
        this._onSortChange.emit(sortKey);
    }

    public applyFilter(filter: Filter): void {
        this._onFilterChange.emit(filter);
    }

    public OnPageChange(): Observable<number> {
        return this._onPageChange.asObservable();
    }

    public OnSortChange(): Observable<string> {
        return this._onSortChange.asObservable();
    }

    public OnFilterChange(): Observable<Filter> {
        return this._onFilterChange.asObservable();
    }

    connect(_: CollectionViewer): Observable<T[] | ReadonlyArray<T>> {
        return this.items.asObservable();
    }

    disconnect(_: CollectionViewer): void {
        this.items.complete();
    }
}
