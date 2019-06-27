import {Validators} from '@angular/forms';
import {DialogService} from '../modals/DialogService';
import {SnackBarService} from '../snacks/SnackBarService';
import {AbstractSiteEntityFormComponent} from './AbstractSiteEntityFormComponent';
import {AbstractContentEntityService} from "../http/AbstractContentEntityService";
import {IContentEntity} from "../models/interfaces/IContentEntity";
import {SnackBarMessage} from "../snacks/SnackBarMessage";
import {AbstractEntity} from "../models/AbstractEntity";
import {FieldInputChange} from "./FieldInputChange";
import {Utils} from "../Utils";
import {PropertiesService} from "../../services/PropertiesService";

export abstract class AbstractContentFormComponent<TModel extends AbstractEntity & IContentEntity, TService extends AbstractContentEntityService<TModel>>
    extends AbstractSiteEntityFormComponent<TModel, TService> {
    protected constructor(private readonly _dialogService: DialogService,
                          propertiesService: PropertiesService,
                          snackBarService: SnackBarService,
                          modelService: TService) {
        super(modelService, propertiesService, snackBarService);
    }

    protected _constructForm(): void {
        this.registerFormControl('title', [<any>Validators.required]);
        this.registerFormControl('url', [<any>Validators.required]);
        this.registerFormControl('blocks', [<any>Validators.required]);
    }

    protected _afterInit(): void {
        super._afterInit();
        this.form.onChange.subscribe((change: FieldInputChange) => {
            if (change.key === 'title') {
                const origSlug = Utils.slugifyUrl(change.oldValue);
                if (this.model && (!this.model.url || origSlug === this.model.url)) {
                    this.model.url = Utils.slugifyUrl(change.newValue);
                    this.updateControlValue('url');
                }
            }
        });
    }

    public changePublishState(): void {
        this.form.success = false;
        this.form.inProgress = true;
        let result;
        if (!this.model) {
            return;
        }
        if (this.model.isPublished) {
            result = this.service.unpublish(this.model.id);
        } else {
            result = this.service.publish(this.model.id);
        }
        result.subscribe(
            (saveResult: TModel) => {
                this.form.hasChanges = false;
                this.form.success = true;
                this.model = saveResult;
                if (saveResult.isPublished) {
                    this._snackBarService.success(new SnackBarMessage('Успех!', 'Опубликовано.'));
                } else {
                    this._snackBarService.success(
                        new SnackBarMessage('Успех!', 'Публикация снята.')
                    );
                }
                this.form.inProgress = false;
            },
            e => {
                this.form.hasErrors = true;
                this._handleSubmitError(e);
                this.form.inProgress = false;
            }
        );
    }
}
