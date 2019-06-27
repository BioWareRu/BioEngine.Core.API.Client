import {Component} from '@angular/core';
import {Validators} from '@angular/forms';
import {AbstractContentBlockFormComponent} from './AbstractContentBlockFormComponent';
import {BlockFieldDescriptor} from './BlockFieldDescriptor';
import {CutBlock} from "../CutBlock";
import {SnackBarService} from "../../components/snacks/SnackBarService";

@Component({
    selector: 'cut-block-form',
    template: `
        <text-input
                [inputFormGroup]="form.formGroup"
                [inputFieldName]="getFieldName('buttonText')"
                inputLabel="Текст кнопки"
        ></text-input>
    `,
    styles: [``]
})
export class CutBlockFormComponent extends AbstractContentBlockFormComponent<CutBlock> {
    constructor(snackBarService: SnackBarService) {
        super(snackBarService);
    }

    protected _getFields(): Array<BlockFieldDescriptor> {
        return [new BlockFieldDescriptor('buttonText', [Validators.required], 'data.buttonText')];
    }

    public isEmpty(): boolean {
        return false;
    }
}
