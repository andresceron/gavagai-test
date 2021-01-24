import { TestBed, ComponentFixture, fakeAsync } from '@angular/core/testing';
import { SearchDetailComponent } from './search-detail.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LexiconService } from '@services/lexicon.service';
import { LexiconServiceStub, ActivatedRouteStub } from 'app/stubs';
import { RouterTestingModule } from '@angular/router/testing';
import { SpyLocation } from '@angular/common/testing';
import { of } from 'rxjs';

describe('SearchDetailComponent', () => {
  let component: SearchDetailComponent;
  let fixture: ComponentFixture<SearchDetailComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchDetailComponent
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: Location, useClass: SpyLocation },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: LexiconService, useClass: LexiconServiceStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDetailComponent);
    component = fixture.componentInstance;

    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute) as any;
    activatedRoute.testParamMap = {};
    activatedRoute.testQueryParamMap = {};
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create search-detail component', () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
  });

  it('should get params and queries from URL and loadWord with wordInformation property', fakeAsync(() => {
    const dummyGetWordResponse = {
      wordInformation: {
        someDummyContent: 'someDummyContent'
      }
    };

    activatedRoute.testParamMap = { wordId: 'dummyWord' };
    activatedRoute.testQueryParamMap = { lang: 'dummyLang' };

    const getWordSpy = spyOn(TestBed.inject(LexiconService), 'getWord').and.returnValue(of(dummyGetWordResponse));
    fixture.detectChanges();

    expect(component.detailWord).toBe('dummyWord');
    expect(component.detailLang).toBe('dummyLang');

    expect(getWordSpy).toHaveBeenCalled();
    expect(getWordSpy).toHaveBeenCalledTimes(1);
    expect(getWordSpy).toHaveBeenCalledWith(component.detailWord, component.detailLang);
  }));

  it('should get undefined params and queries from URL and not loadWord', fakeAsync(() => {
    activatedRoute.testParamMap = {wordId: undefined};
    activatedRoute.testQueryParamMap = {lang: undefined};

    fixture.detectChanges();

    expect(component.detailWord).toBeUndefined();
    expect(component.detailLang).toBe('en');
  }));

  it('should call backToPrevious and go back to previous', fakeAsync(() => {
    const locationBackSpy = spyOn(TestBed.inject(Location), 'back');
    component.backToPrevious();

    expect(component.backToPrevious).toBeDefined();
    expect(locationBackSpy).toHaveBeenCalled();

  }));

});
