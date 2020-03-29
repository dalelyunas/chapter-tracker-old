import { localStorage } from './storage/chrome-storage';

export const LAST_BOOKS_SYNC_KEY = 'last_books_sync';

export const getLastBooksSync = async () =>
  Object.freeze(await localStorage.get(LAST_BOOKS_SYNC_KEY));

export const saveLastBooksSync = () => localStorage.set(LAST_BOOKS_SYNC_KEY, new Date().getTime());

export const clearLastBooksSync = () => localStorage.delete(LAST_BOOKS_SYNC_KEY);
