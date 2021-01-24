import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'environments/environment';

@Injectable()
export class ApiService {
  private config = {
    host: environment.serverUrl
  };

  constructor(
    private http: HttpClient) {}

  private getRequestOptions(params?: any, customHeaders?: HttpHeaders, responseType = 'json'): object {

    if (!responseType) {
    // if (responseType === void 0) {
      responseType = 'json';
    }

    let defaultHeaders: HttpHeaders = new HttpHeaders();
    defaultHeaders = defaultHeaders.set('content-type', 'application/json');
    defaultHeaders = defaultHeaders.set('accept', 'application/json;charset=UTF-8');

    return {
      headers: customHeaders || defaultHeaders,
      params: params ? this.convertJSONtoParams(params) : null,
      responseType: responseType as any
    };
  }

  private convertJSONtoParams(json: any): HttpParams {
    let params: HttpParams = new HttpParams();

    for (const key in json) {

      if (json.hasOwnProperty(key) && (json[key] || json[key] === false || json[key] === 0)) {

        if (json[key].constructor === Array && !json[key].length) {
          continue;

        } else {
          params = params.append(key, String(json[key]));
        }
      }
    }

    return params;
  }

  public get<T>(url: string, params?: { [key: string]: any }, headers?: HttpHeaders, responseType?: string): Observable<T> {
    return this.http.get<T>(this.config.host + url, this.getRequestOptions(params, headers, responseType));
  }

}
