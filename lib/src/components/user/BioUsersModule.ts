import {NgModule} from "@angular/core";
import {UserComponent} from "./UserComponent";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        UserComponent
    ],
    exports: [
        UserComponent
    ]
})
export class BioUsersModule {

}