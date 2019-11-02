export class StorageItemPictureInfo {
    public verticalResolution: number;
    public horizontalResolution: number;
    public mediumThumbnail: StorageItemPictureThumbnail;
    public smallThumbnail: StorageItemPictureThumbnail;
}

export class StorageItemPictureThumbnail {
    public publicUri: string;
    public filePath: string;
    public width: number;
    public height: number;
}