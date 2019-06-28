import {AbstractContentBlockData} from "../components/models/AbstractContentBlockData";
import {StorageItem} from "../components/storage/StorageItem";

export class GalleryBlockData extends AbstractContentBlockData {
    public pictures: Array<StorageItem> = [];
}
