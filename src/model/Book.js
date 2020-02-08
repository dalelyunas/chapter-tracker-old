const insertIntoSortedChapterArray = (arr, chapter) => {
  const arrCopy = [...arr];
  for (let i = 0; i < arrCopy.length; i += 1) {
    if (arrCopy[i].number === chapter.number) {
      arrCopy[i].updatedAt = Math.max(chapter.updatedAt, arrCopy[i].updatedAt);
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

const isChapterValid = (chapter) => {
  return (
    typeof chapter.number === 'number' &&
    typeof chapter.updatedAt === 'number' &&
    !Number.isNaN(chapter.number) &&
    !Number.isNaN(chapter.updatedAt)
  );
};

export const addChapter = (book, chapter) => {
  if (!isChapterValid(chapter)) {
    throw new TypeError('chapter is invalid');
  }

  return Object.freeze({
    ...book,
    chapters: insertIntoSortedChapterArray(book.chapters, chapter),
    currentChapter: chapter,
    updatedAt: Math.max(book.updatedAt, chapter.updatedAt)
  });
};

export const addChapterWithoutUpdate = (book, chapter) => {
  if (!isChapterValid(chapter)) {
    throw new TypeError('chapter is invalid');
  }

  return Object.freeze({
    ...book,
    chapters: insertIntoSortedChapterArray(book.chapters, chapter)
  });
};

export const markDeleted = (book, deletedAt) => {
  return Object.freeze({
    ...book,
    deletedAt
  });
};

export const restoreBook = (book) => {
  return Object.freeze({
    ...book,
    deletedAt: null
  });
};

export const makeBook = (hostname, title, updatedAt) => {
  return Object.freeze({
    hostname,
    title,
    updatedAt,
    chapters: [],
    currentChapter: null,
    deletedAt: null
  });
};

export const makeBookFull = (hostname, title, updatedAt, chapters, currentChapter, deletedAt) => {
  return Object.freeze({
    hostname,
    title,
    updatedAt,
    chapters,
    currentChapter,
    deletedAt
  });
};

export const makeChapter = (number, updatedAt) => {
  return Object.freeze({
    number,
    updatedAt
  });
};

export const isBookValid = (book) => {
  return (
    typeof book.title === 'string' &&
    typeof book.hostname === 'string' &&
    Array.isArray(book.chapters) &&
    typeof book.currentChapter === 'object' &&
    typeof book.updatedAt === 'number' &&
    !Number.isNaN(book.updatedAt) &&
    (book.deletedAt === null ||
      (typeof book.deletedAt === 'number' && !Number.isNaN(book.deletedAt)))
  );
};
