import { get, set } from './chrome-local-storage';

const BOOK_KEY_PREFIX = 'book';

const BOOK_SCHEMA = {
    domain: null,
    chapters: []
}

const getOrDefault = (obj, objKey, defaultVal) => {
    return obj[objKey] || defaultVal;
}

const getBookKey = (domain, bookTitle) => {
    return BOOK_KEY_PREFIX + ':' + domain + ':' + bookTitle;
}

const upsertChapter = async (domain, bookTitle, chapterNum) => {
    const raw = await get(getBookKey(domain, bookTitle));
    const bookData = getOrDefault(raw, BOOK_SCHEMA);
}

const getChapter = async(domain, bookTitle, chapterNum) => {
    const raw = await get(getBookKey(domain, bookTitle));
}


