export const makePageParser = (hostname, bookTitleParser, chapterNumberParser) => {
  return Object.freeze({
    hostname,
    bookTitleParser,
    chapterNumberParser
  });
};

export const isPageParserValid = (pageParser) => {
  return (
    typeof pageParser.bookTitleParser === 'string' &&
    typeof pageParser.chapterNumberParser === 'string' &&
    typeof pageParser.hostname === 'string'
  );
};
