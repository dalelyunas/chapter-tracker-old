import { localStorage } from './storage/chrome-storage';
import { Book } from './model/Book';
import { Chapter } from './model/Chapter';
import { googleDriveAppData } from './storage/google-drive';

const BOOK_KEY_PREFIX = 'book';

const getBookKey = (hostname, bookTitle) => {
  return `${BOOK_KEY_PREFIX}:${hostname}:${bookTitle}`;
};

export const objLiteralToBook = (obj) => {
  if (obj === null) {
    return null;
  }
  const chapters = obj.chapters.map((ch) => new Chapter(ch.number, ch.updatedAt));
  const currentChapter = new Chapter(obj.currentChapter.number, obj.currentChapter.updatedAt);
  return new Book(obj.hostname, obj.title, obj.updatedAt, chapters, currentChapter, obj.deletedAt);
};

export const getBook = async (hostname, bookTitle) => {
  return objLiteralToBook(await localStorage.get(getBookKey(hostname, bookTitle)));
};

export const getBookNotDeleted = async (hostname, bookTitle) => {
  const book = await getBook(hostname, bookTitle);
  return book === null || book.isDeleted() ? null : book;
};

export const saveBook = (book) => {
  if (book.isValid()) {
    return localStorage.set(getBookKey(book.hostname, book.title), book);
  }
  return Promise.reject();
};

export const listBooks = async () => {
  const objs = await localStorage.getAll(BOOK_KEY_PREFIX);
  return objs.map((obj) => objLiteralToBook(obj));
};

export const listNotDeletedBooks = async () => {
  const objs = await localStorage.getAll(BOOK_KEY_PREFIX);
  return objs.map((obj) => objLiteralToBook(obj)).filter((book) => !book.isDeleted());
};

export const deleteBook = async (hostname, bookTitle) => {
  const book = await getBook(hostname, bookTitle);
  book.deletedAt = new Date().getTime();
  return saveBook(book);
};

export const listRemoteBooks = async () => {
  const bookFiles = await (await googleDriveAppData.listFiles()).filter(file => file.name === 'book.json');
  if (bookFiles.length !== 1) {
    await googleDriveAppData.addFile('books.json', 'application/json', '{}');
    return Promise.reject();
  }

  return googleDriveAppData.getFile(bookFiles[0].id);
};

export const saveRemoteBooks = (books) => {
  return googleDriveAppData.
}