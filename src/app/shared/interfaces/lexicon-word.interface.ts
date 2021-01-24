export interface ILexiconWordInterface {
  wordInformation?: IwordInformation;
  semanticallySimilarWords?: IsemanticallySimilarWords[];
}

interface IwordInformation {
  word: string;
  frequency: number;
  documentFrecuency: number;
  absoluteRank: number;
  relativeRank: number;
  vocabularySize: number;
}

interface IsemanticallySimilarWords {
  word: string;
  forWord: string;
  strength: number;
}
