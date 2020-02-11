import { syncStorage } from './storage/chrome-storage';
import { isPageParserValid } from '../model/PageParser';

const PAGE_PARSER_KEY_PREFIX = 'page_parser';

const getPageParserKey = (hostname) => {
  return `${PAGE_PARSER_KEY_PREFIX}:${hostname}`;
};

export const getPageParsers = async () => {
  const objs = await syncStorage.getAllArray(PAGE_PARSER_KEY_PREFIX);
  return objs.map((obj) => Object.freeze(obj));
};

export const getPageParser = async (hostname) => {
  return Object.freeze(await syncStorage.get(getPageParserKey(hostname)));
};

export const savePageParser = (pageParser) => {
  if (isPageParserValid(pageParser)) {
    return syncStorage.set(getPageParserKey(pageParser.hostname), pageParser);
  }
  return Promise.reject(new TypeError('pageparser is invalid'));
};

export const deletePageParser = (hostname) => {
  return syncStorage.delete(getPageParserKey(hostname));
};
