import {BlocksManager} from "./BlocksManager";
import {IContentEntity} from "../components/models/interfaces/IContentEntity";
import {TextBlock} from "./TextBlock";
import {TextBlockFormComponent} from "./editor/TextBlockFormComponent";
import {QuoteBlock} from "./QuoteBlock";
import {QuoteBlockFormComponent} from "./editor/QuoteBlockFormComponent";
import {FileBlock} from "./FileBlock";
import {FileBlockFormComponent} from "./editor/FileBlockFormComponent";
import {GalleryBlock} from "./GalleryBlock";
import {GalleryBlockFormComponent} from "./editor/GalleryBlockFormComponent";
import {PictureBlock} from "./PictureBlock";
import {PictureBlockFormComponent} from "./editor/PictureBlockFormComponent";
import {CutBlock} from "./CutBlock";
import {CutBlockFormComponent} from "./editor/CutBlockFormComponent";
import {TwitterBlock} from "./TwitterBlock";
import {TwitterBlockFormComponent} from "./editor/TwitterBlockFormComponent";
import {YoutubeBlock} from "./YoutubeBlock";
import {YoutubeBlockFormComponent} from "./editor/YoutubeBlockFormComponent";

export abstract class BlocksManagerFactory {
    // noinspection JSMethodCanBeStatic
    public create(entity: IContentEntity): BlocksManager {
        let manager = new BlocksManager(entity);
        manager.registerBlockType('textblock', TextBlock, TextBlockFormComponent);
        manager.registerBlockType('quoteblock', QuoteBlock, QuoteBlockFormComponent);
        manager.registerBlockType('fileblock', FileBlock, FileBlockFormComponent);
        manager.registerBlockType('galleryblock', GalleryBlock, GalleryBlockFormComponent);
        manager.registerBlockType('pictureblock', PictureBlock, PictureBlockFormComponent);
        manager.registerBlockType('cutblock', CutBlock, CutBlockFormComponent);
        manager.registerBlockType('twitterblock', TwitterBlock, TwitterBlockFormComponent);
        manager.registerBlockType('youtubeblock', YoutubeBlock, YoutubeBlockFormComponent);
        return manager;
    }
}
