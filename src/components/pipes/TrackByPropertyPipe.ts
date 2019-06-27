import {Pipe, PipeTransform, TrackByFunction} from '@angular/core';

interface ITrackByFunctionCache {
    [propertyName: string]: <T>(index: number, item: T) => any;
}

const cache: ITrackByFunctionCache = Object.create(null);

@Pipe({
    name: 'trackByProperty',
    pure: true
})
export class TrackByPropertyPipe implements PipeTransform {
    public transform(propertyName: string): TrackByFunction<{}> {
        if (!cache[propertyName]) {
            cache[propertyName] = function trackByProperty<T>(_index, item: T): any {
                return item[propertyName];
            };
        }

        return cache[propertyName];
    }
}
