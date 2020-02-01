import { localStorage } from './storage/chrome-storage';

export const LAST_VIEWED_BOOK_KEY = 'last_viewed_book';

export const getLastViewedBook = async () =>
  Object.freeze(await localStorage.get(LAST_VIEWED_BOOK_KEY));

export const saveLastViewedBook = (lastViewedBook) =>
  localStorage.set(LAST_VIEWED_BOOK_KEY, lastViewedBook);

export const clearLastViewedBook = () => localStorage.delete(LAST_VIEWED_BOOK_KEY);
