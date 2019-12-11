import { get, set } from './chrome-local';
import { getOrDefault } from '../util';

const PAGE_PARSERS_KEY_PREFIX = 'page_parsers';

// page parsers are javascript functions that 
// given context (hostname and dom) produce 
// a book name and chapter number
const PAGE_PARSERS_SCHEMA = {
    bookTitleParser: undefined,
    chapterNumberParser: undefined
};

const getPageParsersKey = hostname => {
    return PAGE_PARSERS_KEY_PREFIX + ':' + hostname;
};

export const getPageParsers = async hostname => {
    return getOrDefault(await get(getPageParsersKey(hostname)), PAGE_PARSERS_SCHEMA);
};

export const upsertPageParsers = async (hostname, data) => {
    set(getPageParsersKey(hostname), data);
};
