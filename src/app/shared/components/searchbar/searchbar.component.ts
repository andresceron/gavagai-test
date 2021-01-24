import {Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'gav-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SearchbarComponent implements OnDestroy, OnInit {
  @Input() dropdownTitle = 'Dropwdown Default Title';
  @Input() dropdownList: object[];

  @Input() set queryDefault(query: string) {
    this.setDefaultQuery(query);
  }

  @Input() set dropdownSelected(selected: object) {
    this.setDefaultSelector(selected);
  }

  @Output() searchValue: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectorValue: EventEmitter<object> = new EventEmitter<object>();

  public searchFormGroup: FormGroup = this.fb.group({
    query: ['', []],
    selector: ['', []]
  });

  private selectorSubscription: Subscription;

  constructor(private fb: FormBuilder) { }

  public ngOnInit(): void {
    this.initFormSubscription();
  }

  public onSearch(): void {
    if (!this.searchFormGroup.valid) {
      return;
    }

    this.searchValue.emit(this.searchFormGroup.get('query').value);
  }

  public ngOnDestroy(): void {
    if (this.selectorSubscription) {
      this.selectorSubscription.unsubscribe();
    }
  }

  private initFormSubscription(): void {
    this.selectorSubscription =
      this.searchFormGroup.get('selector').valueChanges
        .pipe(
          distinctUntilChanged()
        ).subscribe(value => {
          this.setDefaultSelector(value);
          this.selectorValue.emit(value);
        });
  }

  private setDefaultSelector(value): void {
    this.searchFormGroup.get('selector').patchValue(value);
    this.searchFormGroup.get('selector').updateValueAndValidity();
  }

  private setDefaultQuery(value): void {
    this.searchFormGroup.get('query').patchValue(value);
    this.searchFormGroup.get('query').updateValueAndValidity();
  }

}
