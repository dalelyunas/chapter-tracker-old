import { localStorage } from './chrome';

const BOOK_KEY_PREFIX = 'book';

const insertIntoSortedNumberArray = (arr, val) => {
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

const getBookKey = (hostname, bookTitle) => {
    return BOOK_KEY_PREFIX + ':' + hostname + ':' + bookTitle;
};

export class Book {
    constructor(hostname, title, chapters, currentChapter) {
        this.hostname = hostname;
        this.title = title;
        this.chapters = chapters;
        this.currentChapter = currentChapter;
    }
    addChapter(chapterNum) {
        this.chapters = insertIntoSortedNumberArray(this.chapters, chapterNum);
        this.currentChapter = chapterNum
    }
    isValid() {
        return typeof this.title === 'string' &&
            typeof this.hostname === 'string' &&
            Array.isArray(this.chapters) &&
            typeof this.currentChapter === 'number' &&
            !isNaN(this.currentChapter);
    }
    getKey() {
        return getBookKey(this.hostname, this.title);
    }
}

const objLiteralToBook = obj => {
    if (obj === null) {
        return null;
    }
    return new Book(obj.hostname, obj.title, obj.chapters, obj.currentChapter);
};

export const getBookByKey = async (hostname, bookTitle) => {
    return objLiteralToBook(await localStorage.get(getBookKey(hostname, bookTitle)));
};

export const saveBook = book => {
    if (book.isValid()) {
        return localStorage.set(book.getKey(), book);
    } else {
        console.error('Saving invalid book')
        return Promise.reject();
    }
};

export const getAllBooks = async () => {
    const objs = await localStorage.getAll(BOOK_KEY_PREFIX);
    return objs.map(obj => objLiteralToBook(obj));
};

export const deleteBookByKey = (hostname, bookTitle) => {
    return localStorage.delete(getBookKey(hostname, bookTitle));
};
