import {NgModule} from "@angular/core";
import {SafePipe} from "./SafePipe";
import {TrackByPropertyPipe} from "./TrackByPropertyPipe";
import {TruncatePipe} from "./TruncatePipe";
import {FileSizePipe} from "./FileSizePipe";
import {KeysPipe} from "./KeysPipe";

const PIPES = [
    FileSizePipe,
    KeysPipe,
    SafePipe,
    TrackByPropertyPipe,
    TruncatePipe
];

@NgModule({
    declarations: PIPES,
    exports: PIPES

})
export class BioPipesModule {

}
