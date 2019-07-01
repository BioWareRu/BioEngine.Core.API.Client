import BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import {AbstractContentBlockFormComponent} from "./AbstractContentBlockFormComponent";
import {AbstractBaseContentBlock} from "../../components/models/AbstractBaseContentBlock";

export abstract class AbstractEditorBlockFormComponent<TBlock extends AbstractBaseContentBlock> extends AbstractContentBlockFormComponent<TBlock> {
    public editorInstance = BalloonEditor;

    // noinspection JSMethodCanBeStatic
    public get editorConfig(): {} {
        return {
            removePlugins: [
                'UploadAdapter',
                'CKFinder',
                'EasyImage',
                'BlockQuote',
                'MediaEmbed',
                'Table',
                'TableToolbar',
                'Image',
                'ImageCaption',
                'ImageStyle',
                'ImageToolbar',
                'ImageUpload'],
            toolbar: {
                items: [
                    'heading',
                    '|',
                    'bold',
                    'italic',
                    'link',
                    'bulletedList',
                    'numberedList',
                    'undo',
                    'redo'
                ]
            }
        };
    }
}
