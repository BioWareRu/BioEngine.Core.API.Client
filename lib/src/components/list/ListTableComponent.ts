import {CollectionViewer} from '@angular/cdk/collections';
import {DataSource} from '@angular/cdk/table';
import {Component, EventEmitter, Input, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import {ListTableColumnType} from "./ListEnums";
import {AbstractBaseService} from "../http/AbstractBaseService";
import {Filter} from "../http/Filter";
import {AbstractEntity} from "../models/AbstractEntity";
import {ListTableColumn} from "./ListTableColumn";
import {ListTableState} from "./ListTableState";

@Component({
    selector: 'ngx-list-table',
    templateUrl: './ListTableComponent.html',
    styles: [`
        .loading-shade {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 56px;
            right: 0;
            background: rgba(0, 0, 0, 0.15);
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        mat-cell.actions {
            display: flex !important;
            justify-content: flex-end !important;

        }

        ::ng-deep .mat-cell.actions {
            display: flex !important;
            justify-content: flex-end !important;
        }
    `]
})
export class ListTableComponent<T extends AbstractEntity> implements DataSource<T>, OnInit {
    @Input() public service: AbstractBaseService<T> | null = null;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sorter: MatSort;

    public columns: Array<ListTableColumn<T>> = [];
    public dataLoaded = false;
    public columnsToDisplay: Array<string> = [];
    public columnTypes = ListTableColumnType;

    private _items: Subject<T[]> = new BehaviorSubject<T[]>([]);
    private _onStateChange = new EventEmitter<ListTableState>();
    private _sort: string | null = '';
    private _filter: Filter | null = null;

    ngOnInit(): void {
        this.paginator.page.subscribe(e => {
            this._emitState();
        });
        this.sorter.sortChange.subscribe(e => {
            this.applySort(e.active, e.direction);
        });
        if (this._sort !== null) {
            const key = this._sort.replace('-', '');
            const sortDirection: SortDirection = this._sort.indexOf('-') > -1 ? 'desc' : 'asc';
            this.sorter.active = key;
            this.sorter.direction = sortDirection;
        }

    }

    private _emitState(): void {
        this._onStateChange.emit(new ListTableState(this.paginator.pageIndex, this.paginator.pageSize, this._sort, this._filter));
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

    public onStateChange(): Observable<ListTableState> {
        return this._onStateChange.asObservable();
    }

    public setColumns(columns: ListTableColumn<T>[]): void {
        this.columns = columns;
        this.columnsToDisplay = [];
        this.columns.forEach(column => {
            if (!column.hidden) {
                this.columnsToDisplay.push(column.key);
            }
        });
    }

    public load(page: number,
                filter: Filter | null = null,
                itemsPerPage: number = 10,
                sort: string | null = '-dateAdded'): void {
        this.dataLoaded = false;
        this.paginator.pageSize = itemsPerPage;
        this.paginator.pageIndex = page;
        this.service
            .getAll(page, itemsPerPage, sort, filter)
            .subscribe(res => {
                this._items.next(res.data);
                this.paginator.length = res.totalItems;
                this.dataLoaded = true;
            });
    }

    connect(_: CollectionViewer): Observable<T[] | ReadonlyArray<T>> {
        return this._items.asObservable();
    }

    disconnect(_: CollectionViewer): void {
        this._items.complete();
    }
}
