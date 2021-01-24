import { TestBed, ComponentFixture, tick, waitForAsync, fakeAsync } from '@angular/core/testing';
import { SearchbarComponent } from './searchbar.component';

import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@modules/shared.module';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { distinctUntilChanged } from 'rxjs/operators';

describe('SearchbarComponent', () => {
  let component: SearchbarComponent;
  let fixture: ComponentFixture<SearchbarComponent>;
  const fb: FormBuilder = new FormBuilder();

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchbarComponent,
      ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        SharedModule
      ],
      providers: [
        {
          provide: FormBuilder,
          useValue: fb
        }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchbarComponent);
    component = fixture.debugElement.componentInstance;

    component.searchFormGroup = fb.group({
      query:  ['', []],
      selector: ['', []]
    });

    fixture.detectChanges();
  });

  it('should create searchbar component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize setDefaultSelector with default value', () => {
    component.dropdownSelected = {name: 'dummySelected'};

    expect(component.searchFormGroup.controls.query.value).toEqual('');
    expect(component.searchFormGroup.controls.selector.value).toEqual({name: 'dummySelected'});
  });

  it('should initialize setDefaultQuery with default value', () => {
    component.queryDefault = 'dummyQuery';

    fixture.detectChanges();

    expect(component.searchFormGroup.controls.query.value).toEqual('dummyQuery');
    expect(component.searchFormGroup.controls.selector.value).toEqual('');
  });

  it('should initialize searchFormGroup value change subscription', fakeAsync(() => {
    fixture.detectChanges();
    component.searchFormGroup.get('selector').setValue({ name: 'dummyQueryUpdated' });
    component.searchFormGroup.get('selector').updateValueAndValidity({ emitEvent: true });
    tick(1000);

    spyOn(component.selectorValue, 'emit').and.callThrough();
    component.selectorValue.emit({name: 'dummySelected'});

    expect(component.selectorValue.emit).toHaveBeenCalledWith({name: 'dummySelected'});
    expect(component.selectorValue.emit).toHaveBeenCalledTimes(1);
  }));

  it('should call onSearch and emit query value', fakeAsync(() => {
    component.searchFormGroup.get('query').setValue('dummyQuery');
    component.searchFormGroup.get('query').updateValueAndValidity({ emitEvent: true });

    tick(1000);
    component.onSearch();
    expect(component.searchFormGroup.valid).toBeTruthy();

    spyOn(component.searchValue, 'emit').and.callThrough();
    component.searchValue.emit('dummyQuery');

    expect(component.searchValue.emit).toHaveBeenCalledWith('dummyQuery');
    expect(component.searchValue.emit).toHaveBeenCalledTimes(1);
  }));

  it('should call onSearch and do not emit query value', fakeAsync(() => {
    component.searchFormGroup.setErrors({emit: true});
    tick(1000);

    component.onSearch();

    expect(component.searchFormGroup.valid).toBeFalsy();
    expect(component.searchFormGroup.valid).toBeFalsy();

    spyOn(component.searchValue, 'emit').and.callThrough();
    expect(component.searchValue.emit).not.toHaveBeenCalled();
    expect(component.searchValue.emit).toHaveBeenCalledTimes(0);
  }));

});
