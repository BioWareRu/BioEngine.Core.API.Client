import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild} from '@angular/core';

import {BlocksManager} from '../BlocksManager';
import {AbstractContentBlockFormComponent} from './AbstractContentBlockFormComponent';
import {DynamicHostDirective} from "../../components/directives/DynamicHostDirective";
import {AbstractBaseContentBlock} from "../../components/models/AbstractBaseContentBlock";
import {Form} from "../../components/forms/Form";

@Component({
    selector: 'blockForm',
    template: `
        <ng-container>
            <button class="addBlock top" mat-icon-button [matMenuTriggerFor]="menuTop">
                <icon iconName="fa-plus"></icon>
            </button>
            <mat-menu #menuTop="matMenu">
                <ng-container *ngFor="let config of blocksManager.types.values()">
                    <button mat-menu-item (click)="addBlock(config.type, 'before')">
                        <icon [icon]="config.icon"></icon>
                        <span>{{ config.title }}</span>
                    </button>
                </ng-container
                >
            </mat-menu>
        </ng-container>
        <ng-template dynamicHost></ng-template>
        <ng-container>
            <button class="addBlock bottom" mat-icon-button [matMenuTriggerFor]="menu">
                <icon iconName="fa-plus"></icon>
            </button>
            <mat-menu #menu="matMenu">
                <ng-container *ngFor="let config of blocksManager.types.values()">
                    <button mat-menu-item (click)="addBlock(config.type)">
                        <icon [icon]="config.icon"></icon>
                        <span>{{ config.title }}</span>
                    </button>
                </ng-container
                >
            </mat-menu>
        </ng-container>
    `
})
export class BlockFormComponent<TModel extends AbstractBaseContentBlock> implements OnInit {
    constructor(private readonly _componentFactoryResolver: ComponentFactoryResolver) {
    }

    @ViewChild(DynamicHostDirective, {static: true}) adHost: DynamicHostDirective;

    @Input()
    public blocksManager: BlocksManager;

    @Input() public model: TModel;

    @Input()
    public form: Form;

    ngOnInit(): void {

        const blockConfig = this.blocksManager.getBlockConfig(this.model.type);
        if (blockConfig === null) {
            throw new Error('Can\'t find block with type ' + this.model.type);
        }

        const formComponent = blockConfig.formComponent;
        if (!formComponent) {
            throw new Error('Can\'t find form component for ' + this.model.type);
        }
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
            formComponent
        );

        const viewContainerRef = this.adHost.viewContainerRef;
        viewContainerRef.clear();

        const componentRef = viewContainerRef.createComponent(componentFactory);
        const instance = <AbstractContentBlockFormComponent<TModel>>componentRef.instance;
        instance.model = this.model;
        instance.form = this.form;
        instance.blocksManager = this.blocksManager;
    }

    public addBlock(type: string, direction = 'after'): void {
        const newBlock = this.blocksManager.createBlock(type);
        if (this.model.isEmpty()) {
            this.blocksManager.replaceBlock(this.model, newBlock);
        } else {
            this.blocksManager.addBlock(newBlock, this.model, direction);
        }
        this.blocksManager.update();
    }
}
