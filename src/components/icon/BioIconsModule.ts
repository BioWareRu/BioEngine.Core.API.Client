import {NgModule} from "@angular/core";
import {MatIconModule} from "@angular/material";
import {IconComponent} from "./IconComponent";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [
        CommonModule,
        MatIconModule
    ],
    declarations: [
        IconComponent
    ],
    exports: [
        IconComponent
    ]
})
export class BioIconsModule {

}
