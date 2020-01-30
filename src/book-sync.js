import { Book, insertIntoSortedChapterArray, listBooks, saveBook } from './storage/book';

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
  let combinedChapters = [];
  [...local.chapters, ...remote.chapters].forEach((ch) => {
    combinedChapters = insertIntoSortedChapterArray(combinedChapters, ch);
  });

  const currentChapter = maxCurrentChapter(local.currentChapter, remote.currentChapter);

  const updatedAt = Math.max(local.updatedAt, remote.updatedAt);
  let deletedAt = maxDeletedAt(local.deletedAt, remote.deletedAt);
  if (updatedAt > deletedAt) {
    deletedAt = null;
  }

  return new Book(
    remote.hostname,
    remote.title,
    updatedAt,
    combinedChapters,
    currentChapter,
    deletedAt
  );
};

const mergeObjects = (local, remote, mergeFunc) => {
  const combined = { ...local };
  Object.keys(remote).forEach((key) => {
    if (key in combined) {
      combined[key] = mergeFunc(combined[key], remote[key]);
    } else {
      combined[key] = remote[key];
    }
  });

  return combined;
};

const performBookSync = async () => {
  // Get from drive

  // Merge items
  const books = mergeObjects(await listBooks(), {}, mergeBook);

  Object.values(books).forEach((book) => {
    saveBook(book);
  });
};
