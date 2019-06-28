import {moveItemInArray} from '@angular/cdk/drag-drop';
import {Type} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import * as uuid from 'uuid';
import {BlockConfig} from './BlockConfig';
import {IContentEntity} from "../components/models/interfaces/IContentEntity";
import Dictionary from "../components/Dictionary";
import {AbstractBaseContentBlock} from "../components/models/AbstractBaseContentBlock";

export class BlocksManager {
    constructor() {
        this.blocks = this._blocksSubject.asObservable();
    }

    public setEntity(contentItem: IContentEntity) {
        this._contentItem = contentItem;
        if (contentItem.blocks) {
            contentItem.blocks.forEach(block => {
                // is block mapped?
                if (!block.hasOwnProperty('isEmpty')) {
                    let newBlock = this.createBlock(block.type);
                    newBlock.position = block.position;
                    newBlock.id = block.id;
                    newBlock.setData(block['data']);
                    this._blocks.push(newBlock);
                } else {
                    this._blocks.push(block);
                }
            });
        }
        this.update();
    }

    private _contentItem: IContentEntity;
    private readonly _blocks: AbstractBaseContentBlock[] = [];
    private readonly _blocksSubject: Subject<Array<AbstractBaseContentBlock>> = new BehaviorSubject<Array<AbstractBaseContentBlock>>(
        []
    );
    public blocks: Observable<Array<AbstractBaseContentBlock>>;

    public readonly types = new Dictionary<string, BlockConfig>();

    public disableBlockType(type: string): void {
        if (this.types.hasKey(type)) {
            this.types.remove(type);
        }
    }

    public update(): void {
        this._blocksSubject.next(this._blocks.slice());
        this._contentItem.blocks = this._blocks;
    }

    private _setPositions(): void {
        let index = 0;

        this._blocks.forEach(block => {
            block.position = index;
            index++;
        });
    }

    public addBlock(
        block: AbstractBaseContentBlock,
        neighbor: AbstractBaseContentBlock | null = null,
        direction = 'after'
    ): void {
        this._blocks.push(block);
        this._setPositions();
        if (neighbor) {
            const toIndex = direction === 'after' ? neighbor.position + 1 : neighbor.position;
            moveItemInArray(this._blocks, block.position, toIndex);
            this._setPositions();
        }
    }

    public removeBlock(block: AbstractBaseContentBlock): void {
        this._blocks.splice(block.position, 1);
        this._setPositions();
    }

    public createBlock<TBlock extends AbstractBaseContentBlock>(type: string): TBlock {
        if (!this.types.hasKey(type)) {
            throw new Error(`type ${type} is not registered!`);
        }

        const config = this.types.get(type);
        if (config) {
            const block = <TBlock>new config.typeClass();
            block.id = uuid.v4();

            return block;
        }
        throw new Error('Can\'t find block with type ' + type);
    }

    moveBlock(previousIndex: number, currentIndex: number): any {
        moveItemInArray(this._blocks, previousIndex, currentIndex);
        this._setPositions();
    }

    public replaceBlock(oldBlock: AbstractBaseContentBlock, newBlock: AbstractBaseContentBlock): void {
        this._blocks[oldBlock.position] = newBlock;
        this._setPositions();
        this.update();
    }

    public registerBlockType(type: string, typeClass: Type<any>, formComponent: Type<any>): void {
        if (this.types.hasKey(type)) {
            throw new Error(`type ${type} already registered!`);
        }

        const block = <AbstractBaseContentBlock>new typeClass();

        this.types.set(type, new BlockConfig(type, typeClass, block.title, block.icon, formComponent));
    }

    public getBlockConfig(type: string): BlockConfig | null {
        return this.types.get(type);
    }
}
