import {TextBlockData} from './TextBlockData';
import {AbstractContentBlock} from "../components/models/AbstractContentBlock";
import {Icon} from "../components/icon/Icon";

export class TextBlock extends AbstractContentBlock<TextBlockData> {
    public title = 'Текст';
    public icon = new Icon('fa-pen');
    public type = 'textblock';
    data: TextBlockData = new TextBlockData();

    public isEmpty(): boolean {
        return !this.data.text || this.data.text === '' || this.data.text === '<p>&nbsp;</p>';
    }
}


