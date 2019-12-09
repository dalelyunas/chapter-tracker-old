import { get, set } from './chrome-local';
import { getOrDefault } from '../util';

const MATCHER_KEY_PREFIX = 'matcher';

// matchers are javascript functions that 
// given context (domain and dom) produce 
// a book name and chapter number
const MATCHER_SCHEMA = {
    bookNameMatcher: null,
    chapterNumberMatcher: null
};

const getMatcherKey = domain => {
    return MATCHER_KEY_PREFIX + ':' + domain;
};

export const getMatchers = async domain => {
    const matcherKey = getMatcherKey(domain, bookTitle);
    return getOrDefault(await get(matcherKey), MATCHER_SCHEMA);
};

export const replaceMatcherData = async (domain, data) => {
    set(getMatcherKey(domain), data);
};
