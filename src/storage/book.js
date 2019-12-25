import { getLocal, setLocal, deleteLocal } from './chrome';
import { insertIntoSortedNumberArray } from '../util';

const LAST_VIEWED_BOOK_KEY = "last_viewed_book";
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

export const isValidBook = book => {
    return typeof book.title === 'string' &&
        typeof book.hostname === 'string' &&
        typeof book.chapters === 'object' &&
        typeof book.currentChapter === 'number' &&
        typeof book.furthestChapter === 'number';
};

const getBookData = (hostname, bookTitle) => {
    return getLocal(getBookKey(hostname, bookTitle));
};

const saveBookData = async (bookData) => {
    setLocal(getBookKey(bookData.hostname, bookData.title), bookData);
};

const createNewBook = () => ({ ...BOOK_SCHEMA });

export const upsertChapter = async (hostname, bookTitle, chapterNum) => {
    const bookData = await getBookData(hostname, bookTitle) || createNewBook();

    bookData.chapters = insertIntoSortedNumberArray(bookData.chapters, chapterNum);
    bookData.hostname = hostname;
    bookData.title = bookTitle;
    bookData.currentChapter = chapterNum;
    bookData.furthestChapter = Math.max(bookData.furthestChapter, chapterNum);

    if (isValidBook(bookData)) {
        saveBookData(bookData);
    } else {
        console.error('Saving invalid book');
    }
};

export const getCurrentChapter = async (hostname, bookTitle) => {
    const book = await getBookData(hostname, bookTitle);
    if (book !== null) {
        return book.currentChapter;
    }
    return null;
};

export const getFurthestChapter = async (hostname, bookTitle) => {
    const book = await getBookData(hostname, bookTitle);
    if (book !== null) {
        return book.furthestChapter;
    }
    return null;
};

export const getLastViewedBook = () => {
    return getLocal(LAST_VIEWED_BOOK_KEY);
};

export const saveLastViewedBook = (hostname, bookTitle) => {
    return setLocal(LAST_VIEWED_BOOK_KEY, { hostname, bookTitle });
};

export const clearLastViewedBook = () => {
    return deleteLocal(LAST_VIEWED_BOOK_KEY);
}
