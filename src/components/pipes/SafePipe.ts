import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
    name: 'safe'
})
export class SafePipe implements PipeTransform {
    constructor(private readonly _sanitizer: DomSanitizer) {
    }

    transform(url: any, ..._args: any[]): any {
        return this._sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
