import {AbstractContentBlockData} from "../components/models/AbstractContentBlockData";
import {StorageItem} from "../components/storage/StorageItem";

export class PictureBlockData extends AbstractContentBlockData {
    public picture: StorageItem | null = null;
    public url: string;
}
