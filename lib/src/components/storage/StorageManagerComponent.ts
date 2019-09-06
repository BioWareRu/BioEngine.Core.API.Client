import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import Dictionary from '../Dictionary';
import {DialogService} from '../modals/DialogService';
import {CreateFolderDialogComponent} from './CreateFolderDialogComponent';
import {StorageManagerSelectMode} from './StorageManagerSelectMode';
import {StorageNode} from "./StorageNode";
import {StorageService} from "../../services/StorageService";

@Component({
    selector: 'storage-manager',
    templateUrl: './StorageManagerComponent.html',
    styleUrls: ['./StorageManagerComponent.scss']
})
export class StorageManagerComponent implements OnInit {
    public constructor(
        private readonly _storageService: StorageService,
        private readonly _dialogService: DialogService
    ) {
    }

    public items: StorageNode[] = [];
    public columnsToDisplay = ['select', 'icon', 'title', 'size', 'date'];

    @Input()
    public selectMode = StorageManagerSelectMode.None;
    public selectModes = StorageManagerSelectMode;
    public loading = true;

    public currentPath = '/';
    public breadcrumbs = [
        {
            path: '/',
            name: '/'
        }
    ];
    @ViewChild('fileInput', {static: true}) fileInput: ElementRef;

    public selection = new Dictionary<string, StorageNode>();

    ngOnInit(): void {
        let path = localStorage.getItem('beSMPath');
        if (!path) {
            path = '/';
        }
        this.load(path);
    }

    public load(path: string): void {
        path = path.replace('//', '/');
        this.loading = true;
        this._storageService.get(path).subscribe(items => {
            this.items = items;
            this.currentPath = path;
            localStorage.setItem('beSMPath', this.currentPath);
            const parts = path.split('/');
            const breadcrumbs = [
                {
                    name: '/',
                    path: '/'
                }
            ];
            let currentPath = '/';
            parts.forEach(part => {
                if (!part || part === '/') {
                    return;
                }
                currentPath = currentPath + '/' + part;
                breadcrumbs.push({
                    name: part,
                    path: currentPath
                });
            });
            this.breadcrumbs = breadcrumbs;
            this.loading = false;
        });
    }

    public select(node: StorageNode): void {
        if (this.selectMode === StorageManagerSelectMode.None) {
            return;
        }
        if (!node.selected) {
            if (this.selectMode === StorageManagerSelectMode.Single) {
                this.selection.forEach((_, selectedNode) => {
                    selectedNode.selected = false;
                });
                this.selection.clear();
            }
            this.selection.set(node.item.filePath, node);
            node.selected = true;

        } else if (this.selection.hasKey(node.item.filePath)) {
            this.selection.remove(node.item.filePath);
            node.selected = false;
        }
    }

    public confirmSelect(): Array<StorageNode> {
        const items = this.selection.values();
        this.selection.clear();

        return items;
    }

    public enter(node: StorageNode): void {
        if (node.isDirectory) {
            this.load(this.currentPath + '/' + node.path);
        }
    }

    public createFolder(): void {
        this._dialogService
            .show<CreateFolderDialogComponent, string>(CreateFolderDialogComponent, '')
            .dialogRef.afterClosed()
            .subscribe((res: string) => {
                if (res) {
                    let alreadyExists = false;
                    this.items.forEach(item => {
                        if (item.isDirectory && item.name.toLowerCase() === res.toLowerCase()) {
                            alreadyExists = true;
                        }
                    });
                    if (alreadyExists) {
                        alert('folder already exists');
                    } else {
                        this.load((this.currentPath + '/' + res).replace('//', '/'));
                    }
                }
            });
    }

    public upload(): void {
        this.fileInput.nativeElement.click();
    }

    public fileChange($event): void {
        const fileList: FileList = $event.target.files;
        const length = fileList.length;
        if (length > 0) {
            this.loading = true;
            const items: Array<StorageNode> = [];
            for (let i = 0; i < length; i++) {
                const file = fileList[i];
                this._storageService.upload(file, this.currentPath).subscribe(item => {
                    items.push(item);
                    if (items.length === length) {
                        this.load(this.currentPath);
                    }
                });
            }
        }
    }
}


