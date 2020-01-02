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

export const getBookByKey = (hostname, bookTitle) => {
    return localStorage.get(getBookKey(hostname, bookTitle));
};

export const saveBook = book => {
    if (book.isValid()) {
        return localStorage.set(book.getKey(), book);
    } else {
        console.log('Saving invalid book')
        return Promise.reject();
    }
};

export const getAllBooks = () => {
    return localStorage.getAll(BOOK_KEY_PREFIX);
};

export const deleteBookByKey = (hostname, bookTitle) => {
    return localStorage.delete(getBookKey(hostname, bookTitle));
};
