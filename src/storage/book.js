import { get, set } from './chrome-local';
import { insertIntoSortedNumberArray, getOrDefault } from '../util';

const BOOK_KEY_PREFIX = 'book';

// a book under a domain holds the chapters you have read for it
const BOOK_SCHEMA = {
    title: null,
    domain: null,
    chapters: [],
    currentChapter: null,
    furthestChapter: -1
};

const getBookKey = (domain, bookTitle) => {
    return BOOK_KEY_PREFIX + ':' + domain + ':' + bookTitle;
};

const getBookData = async (domain, bookTitle) => {
    const bookKey = getBookKey(domain, bookTitle);
    return getOrDefault(await get(bookKey), BOOK_SCHEMA);
};

const saveBookData = async (domain, bookTitle, data) => {
    set(getBookKey(domain, bookTitle), data);
};

export const upsertChapter = async (domain, bookTitle, chapterNum) => {
    const bookData = getBookData(domain, bookTitle);
    bookData.chapters = insertIntoSortedNumberArray(bookData.chapters, chapterNum);
    bookData.domain = domain;
    bookData.title = bookTitle;
    bookData.currentChapter = chapterNum;
    bookData.furthestChapter = Math.max(bookData.furthestChapter, chapterNum);
    saveBookData(domain, bookTitle, bookData);
}

export const getCurrentChapter = async (domain, bookTitle) => {
    return await getBookData(domain, bookTitle).getCurrentChapter;
}


