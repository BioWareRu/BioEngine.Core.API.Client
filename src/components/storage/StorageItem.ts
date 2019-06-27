import {StorageItemPictureInfo} from './StorageItemPictureInfo';
import {StorageItemType} from './StorageItemType';

export class StorageItem {
    public id: number;
    public fileName: string;
    public fileSize = 0;
    public publicUri: string;
    public filePath: string;
    public type: StorageItemType;
    public pictureInfo: StorageItemPictureInfo;
}


