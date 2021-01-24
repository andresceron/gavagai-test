import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { first, map, shareReplay } from 'rxjs/operators';
import codes from 'iso-language-codes';
import { IlangCodes } from '@interfaces/lang-codes.interface';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { ILexiconWordInterface } from '@interfaces/lexicon-word.interface';

@Injectable({
  providedIn: 'root'
})
export class LexiconService {
  private config = {
    apiKey: environment.apiKey,
  };

  private apiKey = '12c1199d4b43706e6a6e8394b518b7f8';
  private langCodesList = codes;

  constructor(
    private apiService: ApiService
  ) {
  }

  public getWord(word: string, lang: string = 'en', fields?: string): Observable<ILexiconWordInterface | false> {
    return this.apiService
      .get(`lexicon/${lang}/${word}`, {apiKey: this.config.apiKey, additionalFields: fields})
      .pipe(
        shareReplay(),
        first(),
        map((res: any) => {
          if (res?.message) {
            return false;
          }
          return res;
        })
      );
  }

  public getLangs(): Observable<IlangCodes[] | false> {
    return this.apiService
      .get(`languages`, {apiKey: this.config.apiKey})
      .pipe(
        shareReplay(),
        first(),
        map((res: string[] | any) => {
          if (res?.message) {
            return false;
          }

          return this.configLangs(res);
        })
      );
  }

  private configLangs(langs: string[]): IlangCodes[] {
    return this.langCodesList.filter(langCode => {
      return langs.find(lang => {
        return lang.toLowerCase() === langCode.iso639_1.toLowerCase();
      });
    });
  }

}
