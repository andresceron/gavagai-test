import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ILexiconWordInterface } from '@interfaces/lexicon-word.interface';
import { LexiconService } from '@services/lexicon.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'gav-search-detail',
  templateUrl: './search-detail.component.html',
  styleUrls: ['./search-detail.component.scss']
})
export class SearchDetailComponent implements OnInit {
  public detailWord: string;
  public detailLang: string;
  public detailResult: object;
  public isLoading: boolean;
  private DEFAULT_LANG = 'en';

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private lexiconService: LexiconService
  ) {}

  public ngOnInit(): void {
    this.detailWord = this.route.snapshot.paramMap.get('wordId');
    this.detailLang = this.route.snapshot.queryParamMap.get('lang') || this.DEFAULT_LANG;
    if (this.detailWord) {
      this.loadWord(this.detailWord, this.detailLang );
    }
  }

  public backToPrevious(): void {
    this.location.back();
  }

  private loadWord(word: string, lang: string): void {
    this.isLoading = true;
    this.lexiconService.getWord(word, lang)
      .pipe(
        first()
      ).subscribe((res: ILexiconWordInterface) => {
        this.isLoading = false;
        this.detailResult = res?.wordInformation;
      });
  }
}
