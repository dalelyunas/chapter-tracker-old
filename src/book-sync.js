import { getBooksObject, saveBook } from './api/book-api';
import { makeBookFull, addToChapters } from './model/Book';
import { loadBooks, saveBooks } from './api/book-google-drive-api';

const newestCurrentChapter = (a, b) => {
  if (a === null) {
    return b;
  }
  if (b === null) {
    return a;
  }
  return a.updatedAt > b.updatedAt ? a : b;
};

const maxNullable = (a, b) => {
  if (a === null) {
    return b;
  }
  if (b === null) {
    return a;
  }
  return Math.max(a, b);
};

const mergeBook = (local, remote) => {
  const currentChapter = newestCurrentChapter(local.currentChapter, remote.currentChapter);
  const updatedAt = Math.max(local.updatedAt, remote.updatedAt);
  let deletedAt = maxNullable(local.deletedAt, remote.deletedAt);

  if (deletedAt !== null && updatedAt > deletedAt) {
    deletedAt = null;
  }

  let book = makeBookFull(remote.hostname, remote.title, updatedAt, [], currentChapter, deletedAt);
  [...local.chapters, ...remote.chapters].forEach((ch) => {
    book = addToChapters(book, { ...ch });
  });

  return book;
};

const mergeObjects = (local, remote, mergeFunc) => {
  const combined = { ...local };
  Object.keys(remote).forEach((key) => {
    if (key in combined) {
      combined[key] = mergeFunc(combined[key], remote[key]);
    } else {
      combined[key] = { ...remote[key] };
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
    console.log(book);
    saveBook(book);
  });

  return saveBooks(fileId, mergedBooks);
};
