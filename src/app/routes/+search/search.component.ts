import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LexiconService } from '@services/lexicon.service';
import { IlangCodes } from '@interfaces/lang-codes.interface';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ILexiconWordInterface } from '@interfaces/lexicon-word.interface';

@Component({
  selector: 'gav-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lexiconService: LexiconService
  ) {
  }

  public langList: IlangCodes[];
  public wordValue: string;
  public currentLang: string;
  public selectedLang: IlangCodes;
  public similarWordsResults: any[];
  public isLoading = false;

  private DEFAULT_LANG = 'en';
  private SEMANTICALLY_SIMILAR_WORDS_FILTER = 'SEMANTICALLY_SIMILAR_WORDS';

  public ngOnInit(): void {
    this.loadDefaults();
    this.loadLangs();
  }

  public search(value: string): void {
    if (!value) {
      return;
    }

    this.loadResults(value, this.selectedLang?.iso639_1);

    this.router.navigate(
      [`/search/${value}`], {
        queryParams: { lang: this.selectedLang?.iso639_1 },
        queryParamsHandling: 'merge'
      }
    );

  }

  public selector(value): void {
    this.selectedLang = value;
  }

  public selectedWord(value): void {
    this.goToDetail(value);
  }

  private loadDefaults(): void {
    this.currentLang = this.route.snapshot.queryParamMap.get('lang');
    this.wordValue = this.route.snapshot.paramMap.get('wordId');

    if (this.wordValue) {
      this.loadResults(this.wordValue, this.selectedLang?.iso639_1);
    }
  }

  private loadLangs(): void {
    this.lexiconService.getLangs()
      .pipe(first())
      .subscribe((langs: IlangCodes[]) => {
        this.langList = langs;

        this.selectedLang = this.langList.find(lang => lang.iso639_1 === this.currentLang);
        if (!this.selectedLang) {
          this.selectedLang = this.langList.find(lang => lang.iso639_1 === this.DEFAULT_LANG);
        }

      });
  }

  private loadResults(value: string, lang: string = this.DEFAULT_LANG): void {
    this.isLoading = true;
    this.lexiconService.getWord(value, lang, this.SEMANTICALLY_SIMILAR_WORDS_FILTER)
      .pipe(
        first())
      .subscribe((res: ILexiconWordInterface) => {
        this.isLoading = false;
        if (res?.semanticallySimilarWords) {
          this.similarWordsResults = res?.semanticallySimilarWords;
        }
      });
  }

  private goToDetail(value: any): void {
    this.router.navigate(
      [`/search/${value.word}/detail`],
      {
        queryParams: { lang: this.selectedLang?.iso639_1 || 'en' },
        queryParamsHandling: ''
      }
    );
  }

}
