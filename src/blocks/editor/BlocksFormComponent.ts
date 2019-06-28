import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {BlocksManager} from '../BlocksManager';
import {Form} from '../../components/forms/Form';
import {IContentEntity} from "../../components/models/interfaces/IContentEntity";
import {DialogService} from "../../components/modals/DialogService";
import {AbstractBaseContentBlock} from "../../components/models/AbstractBaseContentBlock";
import {BlocksManagerFactory} from "../BlocksManagerFactory";

@Component({
    selector: 'blocksForm',
    templateUrl: `./BlocksFormComponent.html`,
    styleUrls: [`./BlocksFormComponent.scss`],
    encapsulation: ViewEncapsulation.None
})
export class BlocksFormComponent implements OnInit {

    public constructor(private readonly _dialogsService: DialogService, private readonly _blocksManagerFactory: BlocksManagerFactory) {
    }

    @Input()
    public form: Form;

    @Input()
    public model: IContentEntity;
    public blocksManager: BlocksManager;
    private _blocks: AbstractBaseContentBlock[] = [];

    public static equals(x, y): boolean {
        if (x === y) {
            return true;
        }
        // if both x and y are null or undefined and exactly the same
        if (!(x instanceof Object) || !(y instanceof Object)) {
            return false;
        }
        // if they are not strictly equal, they both need to be Objects
        if (x.constructor !== y.constructor) {
            return false;
        }
        // they must have the exact same prototype chain, the closest we can do is
        // test there constructor.

        let p;
        for (p in x) {
            if (!x.hasOwnProperty(p)) {
                continue;
            }
            // other properties were tested using x.constructor === y.constructor
            if (!y.hasOwnProperty(p)) {
                return false;
            }
            // allows to compare x[ p ] and y[ p ] when set to undefined
            if (x[p] === y[p]) {
                continue;
            }
            // if they have the same strict value or identity then they are equal
            if (typeof (x[p]) !== 'object') {
                return false;
            }
            // Numbers, Strings, Functions, Booleans must be strictly equal
            if (!BlocksFormComponent.equals(x[p], y[p])) {
                return false;
            }
        }
        for (p in y) {
            if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
                return false;
            }
        }
        return true;
    }

    ngOnInit(): void {
        this.blocksManager = this._blocksManagerFactory.create(this.model);

        this._blocks = this.model.blocks.slice();
        this.blocksManager.blocks.subscribe(blocks => {
            if (!BlocksFormComponent.equals(blocks, this.model.blocks)) {
                this.form.getControlByProperty('blocks').patchValue(blocks);
                this._blocks = this.model.blocks.slice();
            }
        });

        this.form.onChange.subscribe(() => {
            if (!BlocksFormComponent.equals(this._blocks, this.model.blocks)) {
                this.form.getControlByProperty('blocks').patchValue(this.model.blocks);
                this._blocks = this.model.blocks.slice();
            }
        });

        if (this.model.blocks.length === 0) {
            this.blocksManager.addBlock(this.blocksManager.createBlock('textblock'));
            this.blocksManager.update();
        }
    }

    public addBlock(type: string): void {
        const block = this.blocksManager.createBlock(type);
        this.blocksManager.addBlock(block);
        this.blocksManager.update();
    }

    public deleteBlock(block: AbstractBaseContentBlock): void {
        this._dialogsService
            .confirm('Удаление блока', 'Вы точно хотите удалить это блок?')
            .onConfirm.subscribe(() => {
            this.blocksManager.removeBlock(block);
            this.blocksManager.update();
        });
    }

    public drop(event: CdkDragDrop<Array<string>>): void {
        this.blocksManager.moveBlock(event.previousIndex, event.currentIndex);
        this.blocksManager.update();
        this.form.hasChanges = true;
    }
}
