import { syncStorage } from './storage/chrome-storage';
import { PageParser } from './model/PageParser';

const PAGE_PARSER_KEY_PREFIX = 'page_parser';

const getPageParserKey = (hostname) => {
  return `${PAGE_PARSER_KEY_PREFIX}:${hostname}`;
};

const objLiteralToPageParser = (obj) => {
  if (obj === null) {
    return null;
  }
  return new PageParser(obj.hostname, obj.bookTitleParser, obj.chapterNumberParser);
};

export const listPageParsers = async () => {
  const objs = await syncStorage.getAll(PAGE_PARSER_KEY_PREFIX);
  return objs.map((obj) => objLiteralToPageParser(obj));
};

export const getPageParser = async (hostname) => {
  return objLiteralToPageParser(await syncStorage.get(getPageParserKey(hostname)));
};

export const savePageParser = (pageParser) => {
  if (pageParser.isValid()) {
    return syncStorage.set(getPageParserKey(pageParser.hostname), pageParser);
  }
  return Promise.reject();
};

export const deletePageParser = (hostname) => {
  return syncStorage.delete(getPageParserKey(hostname));
};
