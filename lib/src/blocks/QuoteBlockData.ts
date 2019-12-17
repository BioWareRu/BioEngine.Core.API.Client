import {AbstractContentBlockData} from "../components/models/AbstractContentBlockData";
import {StorageItem} from "../components/storage/StorageItem";

export class QuoteBlockData extends AbstractContentBlockData {
    public text = '';
    public author = '';
    public link = '';
    public picture: StorageItem | null = null;
}
