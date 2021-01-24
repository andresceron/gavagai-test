import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteStub, LexiconServiceStub } from 'app/stubs';
import { LexiconService } from '@services/lexicon.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let activatedRoute: ActivatedRouteStub;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  const dummyLangCode = {
    name: 'English',
    nativeName: 'English',
    iso639_1: 'en',
    iso639_2T: 'eng',
    iso639_2B: 'eng'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchComponent
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: LexiconService, useClass: LexiconServiceStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;

    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute) as any;
    activatedRoute.testParamMap = {};
    activatedRoute.testQueryParamMap = {};
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create search component', () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
  });

  it('should get undefined params from URL and call loadLangs and loadDefaults', fakeAsync(() => {
    activatedRoute.testParamMap = {wordId: undefined};
    activatedRoute.testQueryParamMap = {lang: undefined};

    const getLangSpy = spyOn(TestBed.inject(LexiconService), 'getLangs').and.returnValue(of([dummyLangCode]));
    fixture.detectChanges();

    expect(component.currentLang).toBeUndefined();
    expect(component.wordValue).toBeUndefined();

    expect(getLangSpy).toHaveBeenCalled();
    expect(getLangSpy).toHaveBeenCalledTimes(1);

    expect(component.langList).toEqual([dummyLangCode]);
    expect(component.selectedLang).toEqual(dummyLangCode);
  }));

  it('should get defined params from URL and call loadLangs and loadDefaults', fakeAsync(() => {
    const getLangSpy = spyOn(TestBed.inject(LexiconService), 'getLangs').and.returnValue(of([dummyLangCode]));
    activatedRoute.testParamMap = {wordId: undefined};
    activatedRoute.testQueryParamMap = {lang: 'en'};

    fixture.detectChanges();

    expect(component.currentLang).toBe('en');
    expect(component.wordValue).toBeUndefined();

    expect(getLangSpy).toHaveBeenCalled();
    expect(getLangSpy).toHaveBeenCalledTimes(1);

    expect(component.langList).toEqual([dummyLangCode]);
    expect(component.selectedLang).toEqual(dummyLangCode);
  }));

  it('should get defined params from URL and call defaults and loadResults', fakeAsync(() => {
    const dummyGetWordResponse = {
      semanticallySimilarWords: []
    };

    const getWordSpy = spyOn(TestBed.inject(LexiconService), 'getWord').and.returnValue(of(dummyGetWordResponse));
    const getLangSpy = spyOn(TestBed.inject(LexiconService), 'getLangs').and.returnValue(of([dummyLangCode]));
    activatedRoute.testParamMap = {wordId: 'dummyQuery'};
    activatedRoute.testQueryParamMap = {lang: 'en'};

    fixture.detectChanges();
    tick();

    expect(component.wordValue).toBe('dummyQuery');
    expect(component.currentLang).toBe('en');

    expect(getLangSpy).toHaveBeenCalled();
    expect(getLangSpy).toHaveBeenCalledTimes(1);

    expect(getWordSpy).toHaveBeenCalled();
    expect(getWordSpy).toHaveBeenCalledTimes(1);
    expect(getWordSpy).toHaveBeenCalledWith(component.wordValue, component.currentLang, 'SEMANTICALLY_SIMILAR_WORDS');

    expect(component.similarWordsResults).toEqual(dummyGetWordResponse.semanticallySimilarWords);
    expect(component.selectedLang).toEqual(dummyLangCode);
  }));

  it('should call selectedWord() and goToDetail()', () => {
    component.selectedWord({
      word: 'dummyWord'
    });

    expect(mockRouter.navigate).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(
      [`/search/dummyWord/detail`],
      {
        queryParams: { lang: 'en' },
        queryParamsHandling: ''
      }
    );

    mockRouter.navigate.calls.reset();
  });

  it('should call selector() set selectorLang value', () => {
    component.selector(dummyLangCode);
    expect(component.selectedLang).toBe(dummyLangCode);
  });

  it('should call search() and not execute search if no value', () => {
    component.search(undefined);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
    mockRouter.navigate.calls.reset();
  });

  it('should call search() and execute search', () => {
    const dummyGetWordResponse = {
      semanticallySimilarWords: []
    };

    const getWordSpy = spyOn(TestBed.inject(LexiconService), 'getWord').and.returnValue(of(dummyGetWordResponse));
    component.selectedLang = dummyLangCode;

    component.search('dummyWord');

    fixture.detectChanges();

    expect(mockRouter.navigate).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(
      [`/search/dummyWord`],
      {
        queryParams: { lang: 'en' },
        queryParamsHandling: 'merge'
      }
    );

    expect(getWordSpy).toHaveBeenCalled();
    // expect(getWordSpy).toHaveBeenCalledTimes(1);
    expect(getWordSpy).toHaveBeenCalledWith('dummyWord', 'en', 'SEMANTICALLY_SIMILAR_WORDS');

    mockRouter.navigate.calls.reset();
  });

});
