import {NgModule} from "@angular/core";
import {DynamicHostDirective} from "./directives/DynamicHostDirective";
import {CommonModule} from "@angular/common";
import {MomentModule} from "ngx-moment";
import {MatButtonModule} from "@angular/material/button";
import {BioPipesModule} from "./pipes/BioPipesModule";
import {BioIconsModule} from "./icon/BioIconsModule";
import {FlexLayoutModule} from "@angular/flex-layout";
import {RestClient} from "./http/HttpClient";
import {MenuService} from "../services/MenuService";
import {PagesService} from "../services/PagesService";
import {PostsService} from "../services/PostsService";
import {PropertiesService} from "../services/PropertiesService";
import {SectionsService} from "../services/SectionsService";
import {SitesService} from "../services/SitesService";
import {StorageService} from "../services/StorageService";
import {TagsService} from "../services/TagsService";
import {SectionsCacheProvider} from "../cache/SectionsCacheProvider";
import {SitesCacheProvider} from "../cache/SitesCacheProvider";
import {TagsCacheProvider} from "../cache/TagsCacheProvider";
import {MatMenuModule} from "@angular/material/menu";
import {MatChipsModule} from "@angular/material/chips";
import {BioUsersModule} from "./user/BioUsersModule";

const MODULES = [
    CommonModule,
    MomentModule,
    MatMenuModule,
    MatButtonModule,
    MatMenuModule,
    MatButtonModule,
    MatChipsModule,
    FlexLayoutModule,
    MomentModule,
    BioPipesModule,
    BioIconsModule,
    BioUsersModule
];

@NgModule({
    imports: MODULES,
    declarations: [
        DynamicHostDirective
    ],
    exports: [
        ...MODULES,
        DynamicHostDirective
    ],
    providers: [
        RestClient,
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
export class BioCommonModule {

}
