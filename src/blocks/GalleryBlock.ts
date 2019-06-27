import {ContentBlockItemType} from './ContentBlockItemType';
import {GalleryBlockData} from './GalleryBlockData';
import {AbstractContentBlock} from "../components/models/AbstractContentBlock";
import {Icon} from "../components/icon/Icon";

export class GalleryBlock extends AbstractContentBlock<GalleryBlockData> {
    public title = 'Галерея';
    public icon = new Icon('fa-images');
    public type: ContentBlockItemType = ContentBlockItemType.Gallery;
    data: GalleryBlockData = new GalleryBlockData();

    public isEmpty(): boolean {
        return !this.data.pictures || this.data.pictures.length === 0;
    }
}


