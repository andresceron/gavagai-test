
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { IlangCodes } from '@interfaces/lang-codes.interface';
import { ApiService } from '@services/api.service';
import { ApiServiceStub } from 'app/stubs';
import { of } from 'rxjs';
import { LexiconService } from '../lexicon.service';
import { ILexiconWordInterface } from '@interfaces/lexicon-word.interface';

describe( 'LexiconService: ', () => {
  let service: LexiconService;

  beforeEach( () => {
    TestBed.configureTestingModule( {
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        LexiconService,
        { provide: ApiService, useClass: ApiServiceStub }
      ]
    });

    service = TestBed.inject(LexiconService);
  });

  it('should be created', () => {
    expect( service ).toBeTruthy();
  });

  it('should call get() and return an Observable with data', fakeAsync(() => {
    const dummyData: ILexiconWordInterface = {
      wordInformation: {
        word: 'dummy',
        frequency: 1,
        documentFrecuency: 1,
        absoluteRank: 1,
        relativeRank: 1,
        vocabularySize: 1
      },
      semanticallySimilarWords: [
        {
          word: 'dummier',
          forWord: 'dummy',
          strength: 4
        }
      ]
    };

    const getLangSpy = spyOn(TestBed.inject(ApiService), 'get').and.returnValue(of(dummyData));

    service.getWord('dummyWord', 'en', 'ADDITIONAL_FIELDS');

    expect(getLangSpy).toHaveBeenCalled();
    expect(getLangSpy).toHaveBeenCalledWith(
      'lexicon/en/dummyWord', {
        apiKey: '12c1199d4b43706e6a6e8394b518b7f8',
        additionalFields: 'ADDITIONAL_FIELDS'
    });

    service.getWord('dummyWord').subscribe((data) => {
      expect(data).toEqual(dummyData);
    });
  }));

  it('should call get() and return an Observable with false', fakeAsync(() => {
    const dummyData = { message: 'incorrect' };
    const getLangSpy = spyOn(TestBed.inject(ApiService), 'get').and.returnValue(of(dummyData));

    service.getWord('dummyWord', 'en');

    expect(getLangSpy).toHaveBeenCalled();
    expect(getLangSpy).toHaveBeenCalledWith(
      'lexicon/en/dummyWord', {
        apiKey: '12c1199d4b43706e6a6e8394b518b7f8',
        additionalFields: undefined
    });

    service.getWord('dummyWord').subscribe((data) => {
      expect(data).toBeFalsy();
    });
  }));

  it('should call getLangs() and return an Observable with false', fakeAsync(() => {
    const dummyData = { message: 'incorrect' };
    const getLangSpy = spyOn(TestBed.inject(ApiService), 'get').and.returnValue(of(dummyData));

    service.getLangs();

    expect(getLangSpy).toHaveBeenCalled();
    expect(getLangSpy).toHaveBeenCalledWith(
      'languages', {
        apiKey: '12c1199d4b43706e6a6e8394b518b7f8'
    });

    service.getLangs().subscribe((data) => {
      expect(data).toBeFalsy();
    });
  }));

  it('should call getLangs() and return an Observable with langList', fakeAsync(() => {
    const dummyData = ['EN'];
    const getLangSpy = spyOn(TestBed.inject(ApiService), 'get').and.returnValue(of(dummyData));

    service.getLangs();
    const filteredLangs = configLangs(dummyData);

    expect(getLangSpy).toHaveBeenCalled();
    expect(getLangSpy).toHaveBeenCalledWith(
      'languages', {
        apiKey: '12c1199d4b43706e6a6e8394b518b7f8'
    });

    service.getLangs().subscribe((data) => {
      expect(data).toEqual(filteredLangs);
    });
  }));

  function configLangs(langs: string[]): IlangCodes[] {
    const dummyLangCodes = [{
      name: 'English',
      nativeName: 'English',
      iso639_1: 'en',
      iso639_2T: 'eng',
      iso639_2B: 'eng'
    }];

    return dummyLangCodes.filter(langCode => {
      return langs.find(lang => {
        return lang.toLowerCase() === langCode.iso639_1.toLowerCase();
      });
    });
  }

});
