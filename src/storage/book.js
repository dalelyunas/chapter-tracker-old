import { localStorage } from './chrome';

const BOOK_KEY_PREFIX = 'book';

const insertIntoSortedChapterArray = (arr, chapter) => {
    const arrCopy = [...arr];
    for (let i = 0; i < arrCopy.length; i += 1) {
        if (arrCopy[i].number === chapter.number) {
            arrCopy[i].updatedAt = chapter.updatedAt;
            return arrCopy;
        }
    }
    arrCopy.push(chapter);
    for (let i = arrCopy.length - 1; i > 0; i -= 1) {
        if (arrCopy[i].number < arrCopy[i - 1].number) {
            const tmp = arrCopy[i];
            arrCopy[i] = arrCopy[i - 1];
            arrCopy[i - 1] = tmp;
        }
    }
    return arrCopy;
};

const getBookKey = (hostname, bookTitle) => {
    return BOOK_KEY_PREFIX + ':' + hostname + ':' + bookTitle;
};

export class Chapter {
    constructor(number, updatedAt) {
        this.number = number;
        this.updatedAt = updatedAt;
    }
    isValid() {
        return typeof this.number === 'number' &&
            typeof this.updatedAt === 'number' &&
            !isNaN(this.number) &&
            !isNaN(this.updatedAt);
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
        if (!chapter.isValid()) {
            return;
        }
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
