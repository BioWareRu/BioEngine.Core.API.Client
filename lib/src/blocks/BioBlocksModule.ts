import {DragDropModule} from '@angular/cdk/drag-drop';
import {NgModule} from '@angular/core';
import {BioFormsModule} from '../components/forms/BioFormsModule';
import {BlockFormComponent} from './editor/BlockFormComponent';
import {BlocksFormComponent} from './editor/BlocksFormComponent';
import {CutBlockFormComponent} from './editor/CutBlockFormComponent';
import {FileBlockFormComponent} from './editor/FileBlockFormComponent';
import {GalleryBlockFormComponent} from './editor/GalleryBlockFormComponent';
import {TextBlockFormComponent} from './editor/TextBlockFormComponent';
import {TwitterBlockFormComponent} from './editor/TwitterBlockFormComponent';
import {QuoteBlockFormComponent} from './editor/QuoteBlockFormComponent';
import {PictureBlockFormComponent} from './editor/PictureBlockFormComponent';
import {YoutubeBlockFormComponent} from "./editor/YoutubeBlockFormComponent";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";

const COMPONENTS = [TextBlockFormComponent,
    GalleryBlockFormComponent,
    PictureBlockFormComponent,
    BlockFormComponent,
    TwitterBlockFormComponent,
    PictureBlockFormComponent,
    CutBlockFormComponent,
    FileBlockFormComponent,
    QuoteBlockFormComponent,
    YoutubeBlockFormComponent];

@NgModule({
    imports: [BioFormsModule, DragDropModule, CKEditorModule],
    exports: [BioFormsModule, BlockFormComponent, BlocksFormComponent],
    declarations: [
        BlocksFormComponent,
        ...COMPONENTS
    ],
    entryComponents: [
        ...COMPONENTS
    ]
})
export class BioBlocksModule {
}
