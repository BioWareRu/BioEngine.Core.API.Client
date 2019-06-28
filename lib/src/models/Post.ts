import {AbstractTypedContentItem} from "../components/models/AbstractTypedContentItem";

export class PostData {
}

export class Post extends AbstractTypedContentItem<PostData> {
    public isPinned: boolean;
}
