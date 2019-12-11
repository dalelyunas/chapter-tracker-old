import { get, set } from './chrome-local';
import { getOrDefault } from '../util';

const MATCHER_KEY_PREFIX = 'matcher';

// matchers are javascript functions that 
// given context (hostname and dom) produce 
// a book name and chapter number
const MATCHER_SCHEMA = {
    bookTitleMatcher: undefined,
    chapterNumberMatcher: undefined
};

const getMatcherKey = hostname => {
    return MATCHER_KEY_PREFIX + ':' + hostname;
};

export const getMatcher = async hostname => {
    const matcherKey = getMatcherKey(hostname);
    return getOrDefault(await get(matcherKey), MATCHER_SCHEMA);
};

export const upsertMatcherData = async (hostname, data) => {
    set(getMatcherKey(hostname), data);
};
