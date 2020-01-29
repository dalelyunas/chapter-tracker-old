export class PageParser {
  constructor(hostname, bookTitleParser, chapterNumberParser) {
    this.hostname = hostname;
    this.bookTitleParser = bookTitleParser;
    this.chapterNumberParser = chapterNumberParser;
  }

  isValid() {
    return (
      typeof this.bookTitleParser === 'string' &&
      typeof this.chapterNumberParser === 'string' &&
      typeof this.hostname === 'string'
    );
  }
}
