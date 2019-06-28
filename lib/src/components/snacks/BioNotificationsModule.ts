import {NgModule} from "@angular/core";
import {NotificationComponent} from "./NotificationComponent";
import {BioCommonModule} from "../BioCommonModule";
import {MatCardModule, MatSnackBarModule} from "@angular/material";

@NgModule({
    imports: [
        BioCommonModule,
        MatSnackBarModule,
        MatCardModule
    ],
    declarations: [
        NotificationComponent,
    ],
    exports: [
        NotificationComponent
    ],
    entryComponents: [
        NotificationComponent
    ]
})
export class BioNotificationsModule {

}
