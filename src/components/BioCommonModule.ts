import {NgModule} from "@angular/core";
import {DynamicHostDirective} from "./directives/DynamicHostDirective";
import {CommonModule} from "@angular/common";
import {MomentModule} from "ngx-moment";
import {MatButtonModule, MatChipsModule, MatMenuModule, MatTableModule} from "@angular/material";
import {BioPipesModule} from "./pipes/BioPipesModule";
import {BioIconsModule} from "./icon/BioIconsModule";
import {FlexLayoutModule} from "@angular/flex-layout";

const MODULES = [
    CommonModule,
    MomentModule,
    MatMenuModule,
    MatButtonModule,
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    MatChipsModule,
    FlexLayoutModule,
    MomentModule,
    BioPipesModule,
    BioIconsModule
];

@NgModule({
    imports: MODULES,
    declarations: [
        DynamicHostDirective
    ],
    exports: [
        ...MODULES,
        DynamicHostDirective
    ]
})
export class BioCommonModule {

}
