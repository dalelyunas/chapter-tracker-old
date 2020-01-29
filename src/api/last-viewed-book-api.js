import { localStorage } from './storage/chrome-storage';
import { LastViewedBook } from './model/LastViewedBook';

export const LAST_VIEWED_BOOK_KEY = 'last_viewed_book';

const objLiteralToLastViewedBook = (obj) => {
  if (obj === null) {
    return null;
  }
  return new LastViewedBook(obj.hostname, obj.title);
};

export const getLastViewedBook = async () =>
  objLiteralToLastViewedBook(await localStorage.get(LAST_VIEWED_BOOK_KEY));

export const saveLastViewedBook = (lastViewedBook) =>
  localStorage.set(LAST_VIEWED_BOOK_KEY, lastViewedBook);

export const clearLastViewedBook = () => localStorage.delete(LAST_VIEWED_BOOK_KEY);
