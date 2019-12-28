import { getLocal, setLocal, deleteLocal, getAllLocal } from './chrome';

const LAST_VIEWED_BOOK_KEY = "last_viewed_book";
const BOOK_KEY_PREFIX = 'book';

export const insertIntoSortedNumberArray = (arr, val) => {
    const resultArr = new Array(arr.length + 1);
    resultArr[0] = val;
    let arrIndex = 0;
    for (let i = 1; i < resultArr.length; i += 1) {
        resultArr[i] = arr[arrIndex];
        arrIndex += 1;
        if (resultArr[i] === resultArr[i - 1]) {
            return arr;
        }
        if (resultArr[i] < resultArr[i - 1]) {
            const tmp = resultArr[i];
            resultArr[i] = resultArr[i - 1];
            resultArr[i - 1] = tmp;
        }
    }
    return resultArr;
};

// a book under a hostname holds the chapters you have read for it
const BOOK_SCHEMA = {
    title: undefined,
    hostname: undefined,
    chapters: [],
    currentChapter: undefined
};

const getBookKey = (hostname, bookTitle) => {
    return BOOK_KEY_PREFIX + ':' + hostname + ':' + bookTitle;
};

export const isValidBook = book => {
    return typeof book.title === 'string' &&
        typeof book.hostname === 'string' &&
        Array.isArray(book.chapters) &&
        typeof book.currentChapter === 'number' &&
        !isNaN(book.currentChapter);
};

const getBookData = (hostname, bookTitle) => {
    return getLocal(getBookKey(hostname, bookTitle));
};

const saveBookData = bookData => {
    return setLocal(getBookKey(bookData.hostname, bookData.title), bookData);
};

const createNewBook = () => ({ ...BOOK_SCHEMA });

export const upsertChapter = async (hostname, bookTitle, chapterNum) => {
    const bookData = await getBookData(hostname, bookTitle) || createNewBook();

    bookData.chapters = insertIntoSortedNumberArray(bookData.chapters, chapterNum);
    bookData.hostname = hostname;
    bookData.title = bookTitle;
    bookData.currentChapter = chapterNum;

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

export const getChapters = async (hostname, bookTitle) => {
    const book = await getBookData(hostname, bookTitle);
    if (book !== null) {
        return book.chapters;
    }
    return null;
};

export const getAllBooks = async () => {
    const allItems = await getAllLocal();
    const bookItems = []
    for (let key of Object.keys(allItems)) {
        if (key.startsWith(BOOK_KEY_PREFIX)) {
            bookItems.push(allItems[key]);
        }
    }
    return bookItems;
};

export const deleteBook = (hostname, bookTitle) => {
    return deleteLocal(getBookKey(hostname, bookTitle));
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
