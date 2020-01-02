import { localStorage } from './chrome';

const LAST_VIEWED_BOOK_KEY = "last_viewed_book";

export class LastViewedBook {
    constructor(hostname, title) {
        this.hostname = hostname;
        this.title = title;
    }
}

const objLiteralToLastViewedBook = obj => {
    if (obj === null) {
        return null;
    }
    return new LastViewedBook(obj.hostname, obj.title);
};

export const getLastViewedBook = async () => {
    return objLiteralToLastViewedBook(await localStorage.get(LAST_VIEWED_BOOK_KEY));
};

export const saveLastViewedBook = lastViewedBook => {
    return localStorage.set(LAST_VIEWED_BOOK_KEY, lastViewedBook);
};

export const clearLastViewedBook = () => {
    return localStorage.delete(LAST_VIEWED_BOOK_KEY);
}