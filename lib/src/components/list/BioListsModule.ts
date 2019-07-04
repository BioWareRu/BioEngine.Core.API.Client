import {NgModule} from "@angular/core";
import {ListTableComponent} from "./ListTableComponent";
import {MatTableModule} from "@angular/material/table";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {BioCommonModule} from "../BioCommonModule";
import {TagsLabelsListComponent} from "./TagsLabelsListComponent";
import {SitesLabelsListComponent} from "./SitesLabelsListComponent";
import {SectionsLabelsListComponent} from "./SectionsLabelsListComponent";
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [
        BioCommonModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        RouterModule
    ],
    declarations: [
        ListTableComponent,
        SectionsLabelsListComponent,
        SitesLabelsListComponent,
        TagsLabelsListComponent
    ],
    exports: [
        ListTableComponent,
        SectionsLabelsListComponent,
        SitesLabelsListComponent,
        TagsLabelsListComponent
    ]
})
export class BioListsModule {

}