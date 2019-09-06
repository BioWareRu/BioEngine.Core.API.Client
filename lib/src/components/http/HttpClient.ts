import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

export class RestClientOptions {
    constructor(public readonly baseUrl: string) {

    }
}

@Injectable()
export class RestClient {
    constructor(private readonly _httpClient: HttpClient, private readonly _options: RestClientOptions) {
    }

    public static encodeQueryData(data): string {
        const ret: string[] = [];
        for (const d in data) {
            if (!data.hasOwnProperty(d)) {
                continue;
            }
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        }

        return ret.join('&');
    }

    public get(resource, params): Observable<any> {
        return this._httpClient.get(this._getUrl(resource, params));
    }

    public post(resource, data, params = {}): Observable<any> {
        return this._httpClient.post(this._getUrl(resource, params), data);
    }

    public put(resource, data): Observable<any> {
        return this._httpClient.put(this._getUrl(resource), data);
    }

    public delete(resource, params = {}): Observable<any> {
        return this._httpClient.delete(this._getUrl(resource, params));
    }

    private _getUrl(resource: string, params?: object): string {
        let url = this._options.baseUrl + resource + '?';
        if (params) {
            url += RestClient.encodeQueryData(params);
        }

        return url;
    }
}
