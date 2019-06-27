import {ContentBlockItemType} from './ContentBlockItemType';
import {QuoteBlockData} from './QuoteBlockData';
import {AbstractContentBlock} from "../components/models/AbstractContentBlock";
import {Icon} from "../components/icon/Icon";

export class QuoteBlock extends AbstractContentBlock<QuoteBlockData> {
    public title = 'Цитата';
    public icon = new Icon('fa-quote-right');
    public type: ContentBlockItemType = ContentBlockItemType.Quote;
    data: QuoteBlockData = new QuoteBlockData();

    public isEmpty(): boolean {
        return !this.data.text || this.data.text === '' || this.data.text === '<p>&nbsp;</p>';
    }
}


