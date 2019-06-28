import {TwitterBlockData} from './TwitterBlockData';
import {AbstractContentBlock} from "../components/models/AbstractContentBlock";
import {Icon} from "../components/icon/Icon";

export class TwitterBlock extends AbstractContentBlock<TwitterBlockData> {
    public title = 'Twitter';
    public icon = new Icon('fa-twitter', 'fab');
    public type = 'twitterblock';
    data: TwitterBlockData = new TwitterBlockData();

    public isEmpty(): boolean {
        return !this.data.tweetId;
    }
}


