import {NgModule} from "@angular/core";
import {NotificationComponent} from "./NotificationComponent";
import {BioCommonModule} from "../BioCommonModule";
import {MatCardModule} from "@angular/material/card";
import {MatSnackBarModule} from '@angular/material/snack-bar';

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
