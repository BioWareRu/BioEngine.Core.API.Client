import {ContentBlockItemType} from './ContentBlockItemType';
import {PictureBlockData} from './PictureBlockData';
import {AbstractContentBlock} from "../components/models/AbstractContentBlock";
import {Icon} from "../components/icon/Icon";

export class PictureBlock extends AbstractContentBlock<PictureBlockData> {
    public title = 'Картинка';
    public icon = new Icon('fa-image');
    public type: ContentBlockItemType = ContentBlockItemType.Picture;
    data: PictureBlockData = new PictureBlockData();

    public isEmpty(): boolean {
        return !this.data.picture;
    }
}
