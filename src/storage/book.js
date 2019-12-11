import { get, set } from './chrome-local';
import { insertIntoSortedNumberArray, getOrDefault } from '../util';

const BOOK_KEY_PREFIX = 'book';

// a book under a hostname holds the chapters you have read for it
const BOOK_SCHEMA = {
    title: undefined,
    hostname: undefined,
    chapters: [],
    currentChapter: undefined,
    furthestChapter: -1
};

const getBookKey = (hostname, bookTitle) => {
    return BOOK_KEY_PREFIX + ':' + hostname + ':' + bookTitle;
};

const getBookData = async (hostname, bookTitle) => {
    const bookKey = getBookKey(hostname, bookTitle);
    return getOrDefault(await get(bookKey), BOOK_SCHEMA);
};

const saveBookData = async (hostname, bookTitle, data) => {
    set(getBookKey(hostname, bookTitle), data);
};

export const upsertChapter = async (hostname, bookTitle, chapterNum) => {
    const bookData = getBookData(hostname, bookTitle);
    bookData.chapters = insertIntoSortedNumberArray(bookData.chapters, chapterNum);
    bookData.hostname = hostname;
    bookData.title = bookTitle;
    bookData.currentChapter = chapterNum;
    bookData.furthestChapter = Math.max(bookData.furthestChapter, chapterNum);
    saveBookData(hostname, bookTitle, bookData);
}

export const getCurrentChapter = async (hostname, bookTitle) => {
    return await getBookData(hostname, bookTitle).getCurrentChapter;
}


