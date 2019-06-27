import {AbstractContentBlockData} from "../components/models/AbstractContentBlockData";
import {StorageItem} from "../components/storage/StorageItem";

export class FileBlockData extends AbstractContentBlockData {
    public file: StorageItem | null = new StorageItem();
}
