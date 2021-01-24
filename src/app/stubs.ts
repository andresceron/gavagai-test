import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { convertToParamMap, ParamMap } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable()
export class ApiServiceStub {
  public get(url: string, params?: { [key: string]: any }, headers?: HttpHeaders, responseType?: string): Observable<any> {
    return of();
  }
}

@Injectable()
export class LexiconServiceStub {
  public getWord(word: string, lang: string) {
    return of().pipe();
  }

  public getLangs() {
    return of().pipe();
  }
}

@Injectable()
export class ActivatedRouteStub {
      // Observable that contains a map of the parameters
      private subjectParamMap = new BehaviorSubject(convertToParamMap(this.testParamMap));
      paramMap = this.subjectParamMap.asObservable();

      private testParamMapData: ParamMap;
      get testParamMap() {
        return this.testParamMapData;
      }
      set testParamMap(params: {}) {
        this.testParamMapData = convertToParamMap(params);
        this.subjectParamMap.next(this.testParamMapData);
      }

      // Observable that contains a map of the query parameters
      private subjectQueryParamMap = new BehaviorSubject(convertToParamMap(this.testParamMap));
      queryParamMap = this.subjectQueryParamMap.asObservable();

      private testQueryParamMapData: ParamMap;
      get testQueryParamMap() {
        return this.testQueryParamMapData;
      }
      set testQueryParamMap(params: {}) {
        this.testQueryParamMapData = convertToParamMap(params);
        this.subjectQueryParamMap.next(this.testQueryParamMapData);
      }

      get snapshot() {
        return {
          paramMap: this.testParamMap,
          queryParamMap: this.testQueryParamMap
        };
      }
}
