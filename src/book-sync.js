import { getBooksObject, saveBook, objLiteralToBook } from './api/book-api';
import { makeBook } from './model/Book';
import { Chapter } from './model/Chapter';
import { loadBooks, saveBooks } from './api/book-google-drive-api';

const maxCurrentChapter = (a, b) => {
  if (a === null) {
    return b.updatedAt;
  }
  if (b === null) {
    return a.updatedAt;
  }
  return Math.max(a.updatedAt, b.updatedAt);
};

const maxDeletedAt = (a, b) => {
  if (a === null) {
    return b;
  }
  if (b === null) {
    return a;
  }
  return Math.max(a, b);
};

const mergeBook = (local, remote) => {
  const currentChapter = maxCurrentChapter(local.currentChapter, remote.currentChapter);

  const updatedAt = Math.max(local.updatedAt, remote.updatedAt);
  let deletedAt = maxDeletedAt(local.deletedAt, remote.deletedAt);
  if (updatedAt > deletedAt) {
    deletedAt = null;
  }
  let book = makeBook(remote.hostname, remote.title, updatedAt);

  const book = new Book(remote.hostname, remote.title, updatedAt, [], currentChapter, deletedAt);

  [...local.chapters, ...remote.chapters].forEach((ch) => {
    book.addChapter(new Chapter(ch.number, ch.updatedAt));
  });

  return book;
};

const mergeObjects = (local, remote, mergeFunc) => {
  const combined = local;
  console.log(combined);
  Object.keys(remote).forEach((key) => {
    if (key in combined) {
      combined[key] = mergeFunc(combined[key], remote[key]);
    } else {
      combined[key] = objLiteralToBook(remote[key]);
    }
  });

  return combined;
};

export const performBookSync = async () => {
  const { fileId, books } = await loadBooks();
  console.log(books);
  const mergedBooks = mergeObjects(await getBooksObject(), books, mergeBook);
  console.log(mergedBooks);
  Object.values(mergedBooks).forEach((book) => {
    // saveBook(book);
  });

  // return saveBooks(fileId, mergedBooks);
};
