import { localStorage } from './chrome';

const BOOK_KEY_PREFIX = 'book';

const insertIntoSortedChapterArray = (arr, chapter) => {
    console.log(chapter);
    const resultArr = new Array(arr.length + 1);
    resultArr[0] = chapter;
    let arrIndex = 0;
    for (let i = 1; i < resultArr.length; i += 1) {
        resultArr[i] = arr[arrIndex];
        arrIndex += 1;
        if (resultArr[i].number === resultArr[i - 1].number) {
            // TODO noop this somehow and resolve updatedAt
            return arr;
        }
        if (resultArr[i].number < resultArr[i - 1].number) {
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

export class Chapter {
    constructor(number, updatedAt) {
        this.number = number;
        this.updatedAt = updatedAt;
    }
}

export class Book {
    constructor(hostname, title, chapters, currentChapter, updatedAt) {
        this.hostname = hostname;
        this.title = title;
        this.chapters = chapters;
        this.currentChapter = currentChapter;
        this.updatedAt = updatedAt;
    }
    addChapter(chapter) {
        this.chapters = insertIntoSortedChapterArray(this.chapters, chapter);
        this.currentChapter = chapter
        this.updatedAt = chapter.updatedAt
    }
    isValid() {
        return typeof this.title === 'string' &&
            typeof this.hostname === 'string' &&
            Array.isArray(this.chapters) &&
            typeof this.currentChapter === 'object' &&
            typeof this.updatedAt === 'number' &&
            !isNaN(this.updatedAt);
    }
    getKey() {
        return getBookKey(this.hostname, this.title);
    }
}

const objLiteralToBook = obj => {
    if (obj === null) {
        return null;
    }
    const chapters = obj.chapters.map(ch => new Chapter(ch.number, ch.updatedAt));
    const currentChapter = new Chapter(obj.currentChapter.number, obj.currentChapter.updatedAt);
    return new Book(obj.hostname, obj.title, chapters, currentChapter);
};

export const getBookByKey = async (hostname, bookTitle) => {
    return objLiteralToBook(await localStorage.get(getBookKey(hostname, bookTitle)));
};

export const saveBook = book => {
    console.log(book);
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
