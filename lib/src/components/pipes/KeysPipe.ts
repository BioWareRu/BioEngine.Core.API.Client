import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
    transform(value, _args: Array<string>): any {
        const keys: any[] = [];
        // tslint:disable-next-line:forin
        for (const key in value) {
            if (!value.hasOwnProperty(key)) {
                continue;
            }
            keys.push({ key, value: value[key] });
        }
        return keys;
    }
}
