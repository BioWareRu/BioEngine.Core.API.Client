import {ContentBlockItemType} from './ContentBlockItemType';
import {YoutubeBlockData} from './YoutubeBlockData';
import {AbstractContentBlock} from "../components/models/AbstractContentBlock";
import {Icon} from "../components/icon/Icon";

export class YoutubeBlock extends AbstractContentBlock<YoutubeBlockData> {
    public title = 'Youtube';
    public icon = new Icon('fa-youtube', 'fab');
    public type: ContentBlockItemType = ContentBlockItemType.Youtube;
    data: YoutubeBlockData = new YoutubeBlockData();

    public isEmpty(): boolean {
        return !this.data.youtubeId;
    }
}
