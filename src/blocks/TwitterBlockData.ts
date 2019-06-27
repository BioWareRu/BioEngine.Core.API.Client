import {AbstractContentBlockData} from "../components/models/AbstractContentBlockData";

export class TwitterBlockData extends AbstractContentBlockData {
    public tweetId: string | null = null;
    public tweetAuthor: string | null = null;
    public tweetUrl = '';
}
