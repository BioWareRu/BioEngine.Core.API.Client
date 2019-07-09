import {NgModule} from "@angular/core";
import {StorageManagerDialogComponent} from "./StorageManagerDialogComponent";
import {StorageManagerComponent} from "./StorageManagerComponent";
import {CreateFolderDialogComponent} from "./CreateFolderDialogComponent";
import {BioCommonModule} from "../BioCommonModule";
import {BioDialogsModule} from "../modals/BioDialogsModule";
import {BioFormsModule} from "../forms/BioFormsModule";
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
    imports: [
        BioCommonModule,
        BioDialogsModule,
        BioFormsModule,
        MatSortModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule
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
