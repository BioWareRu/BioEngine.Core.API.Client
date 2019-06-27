import {NgModule} from "@angular/core";
import {BioCommonModule} from "./components/BioCommonModule";
import {BioNotificationsModule} from "./components/snacks/BioNotificationsModule";
import {BioDialogsModule} from "./components/modals/BioDialogsModule";
import {MenuService} from "./services/MenuService";
import {PagesService} from "./services/PagesService";
import {PostsService} from "./services/PostsService";
import {PropertiesService} from "./services/PropertiesService";
import {SectionsService} from "./services/SectionsService";
import {SitesService} from "./services/SitesService";
import {StorageService} from "./services/StorageService";
import {TagsService} from "./services/TagsService";
import {SectionsCacheProvider} from "./cache/SectionsCacheProvider";
import {SitesCacheProvider} from "./cache/SitesCacheProvider";
import {TagsCacheProvider} from "./cache/TagsCacheProvider";
import {BioFormsModule} from "./components/forms/FormsModule";
import {BioBlocksModule} from "./blocks/BioBlocksModule";

const MODULES = [
    BioCommonModule,
    BioFormsModule,
    BioNotificationsModule,
    BioDialogsModule,
    BioBlocksModule
];

@NgModule({
    imports: MODULES,
    exports: MODULES,
    providers: [
        MenuService,
        PagesService,
        PostsService,
        PropertiesService,
        SectionsService,
        SitesService,
        StorageService,
        TagsService,
        SectionsCacheProvider,
        SitesCacheProvider,
        TagsCacheProvider
    ]
})
export class BioClientModule {

}
