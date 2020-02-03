import { localStorage } from './storage/chrome-storage';
import { isBookValid, markDeleted } from '../model/Book';

const BOOK_KEY_PREFIX = 'book';

const getBookKey = (hostname, bookTitle) => {
  return `${BOOK_KEY_PREFIX}:${hostname}:${bookTitle}`;
};

export const getBook = async (hostname, bookTitle) => {
  return Object.freeze(await localStorage.get(getBookKey(hostname, bookTitle)));
};

export const getActiveBook = async (hostname, bookTitle) => {
  const book = await getBook(hostname, bookTitle);
  return book === null || book.deletedAt !== null ? null : book;
};

export const saveBook = (book) => {
  if (isBookValid(book)) {
    return localStorage.set(getBookKey(book.hostname, book.title), book);
  }

  return Promise.reject(new TypeError('book is invalid'));
};

export const getBooksObject = async () => {
  return localStorage.getAllObject(BOOK_KEY_PREFIX);
};

export const getActiveBooks = async () => {
  const objs = await localStorage.getAll(BOOK_KEY_PREFIX);
  return objs.map((obj) => Object.freeze(obj)).filter((book) => book.deletedAt === null);
};

export const deleteBook = async (hostname, bookTitle) => {
  const book = await getBook(hostname, bookTitle);
  return saveBook(markDeleted(book, new Date().getTime()));
};
