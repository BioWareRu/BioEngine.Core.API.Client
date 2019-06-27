import {NgModule} from "@angular/core";
import {ConfirmationDialogComponent} from "./ConfirmationDialogService";
import {BioCommonModule} from "../BioCommonModule";
import {MatDialogModule} from "@angular/material";

@NgModule({
    imports: [
        BioCommonModule,
        MatDialogModule
    ],
    declarations: [
        ConfirmationDialogComponent
    ],
    exports: [
        ConfirmationDialogComponent,
        MatDialogModule
    ],
    entryComponents: [
        ConfirmationDialogComponent
    ]
})
export class BioDialogsModule {

}
