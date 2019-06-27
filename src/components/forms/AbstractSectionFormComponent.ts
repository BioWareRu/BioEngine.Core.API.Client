import {Validators} from '@angular/forms';
import {AbstractContentEntityService} from "../http/AbstractContentEntityService";
import {AbstractContentFormComponent} from "./AbstractContentFormComponent";
import {AbstractSection} from "../models/AbstractSection";

export abstract class AbstractSectionFormComponent<TModel extends AbstractSection, TService extends AbstractContentEntityService<TModel>>
    extends AbstractContentFormComponent<TModel, TService> {

    protected _constructForm(): void {
        this.registerFormControl('title', [<any>Validators.required]);
        this.registerFormControl('url', [<any>Validators.required]);
        this.registerFormControl('blocks', [<any>Validators.required]);
        this.registerFormControl('hashtag', [<any>Validators.required], 'data.hashtag');
        this.registerFormControl('logo', [<any>Validators.required], 'data.logo');
        this.registerFormControl('logoSmall', [<any>Validators.required], 'data.logoSmall');
        this.registerFormControl('siteIds', [<any>Validators.required]);
    }
}
