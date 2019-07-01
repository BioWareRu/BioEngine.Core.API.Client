import {NgModule} from "@angular/core";
import {StorageManagerDialogComponent} from "./StorageManagerDialogComponent";
import {StorageManagerComponent} from "./StorageManagerComponent";
import {CreateFolderDialogComponent} from "./CreateFolderDialogComponent";
import {BioCommonModule} from "../BioCommonModule";
import {BioDialogsModule} from "../modals/BioDialogsModule";
import {MatSortModule, MatTableModule} from "@angular/material";
import {BioFormsModule} from "../forms/BioFormsModule";

@NgModule({
    imports: [
        BioCommonModule,
        BioDialogsModule,
        BioFormsModule,
        MatSortModule,
        MatTableModule
    ],
    declarations: [
        StorageManagerDialogComponent,
        StorageManagerComponent,
        CreateFolderDialogComponent
    ],
    exports: [
        StorageManagerDialogComponent,
        StorageManagerComponent,
        CreateFolderDialogComponent
    ],
    entryComponents: [
        StorageManagerDialogComponent,
        StorageManagerComponent,
        CreateFolderDialogComponent
    ]
})
export class BioStorageModule {

}
