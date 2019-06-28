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

export class ListProviderState {
    public constructor(public currentPage: number, public itemsPerPage: number, public sort: string | null, public filter: Filter | null) {
    }
}

export class ListProvider<T extends AbstractEntity> implements DataSource<T> {
    public items: Subject<Array<T>> = new BehaviorSubject<Array<T>>([]);
    public columns: Array<ListTableColumn<T>>;
    public paginator: MatPaginator;
    public sorter: MatSort;
    public dataLoaded = false;

    private _onStateChange = new EventEmitter<ListProviderState>();

    constructor(
        private readonly _service: AbstractBaseService<T>,
        private _filter: Filter | null = null,
        private _currentPage: number = 0,
        private itemsPerPage: number = 10,
        private _sort: string | null = '-dateAdded'
    ) {
    }

    public init(): void {
        this.paginator.page.subscribe(e => {
            this.itemsPerPage = e.pageSize;
            this._currentPage = e.pageIndex;
            this._emitState();
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

    private _emitState() {
        this._onStateChange.emit(new ListProviderState(this._currentPage, this.itemsPerPage, this._sort, this._filter));
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
        this._sort = sortKey;
        this._emitState();
    }

    public applyFilter(filter: Filter): void {
        this._filter = filter;
        this._emitState();
    }

    public onStateChange(): Observable<ListProviderState> {
        return this._onStateChange.asObservable();
    }

    connect(_: CollectionViewer): Observable<T[] | ReadonlyArray<T>> {
        return this.items.asObservable();
    }

    disconnect(_: CollectionViewer): void {
        this.items.complete();
    }
}
