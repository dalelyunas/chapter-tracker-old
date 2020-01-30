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

export class Book {
  constructor(hostname, title, updatedAt, chapters = [], currentChapter = null, deletedAt = null) {
    this.hostname = hostname;
    this.title = title;
    this.chapters = chapters;
    this.currentChapter = currentChapter;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  addChapter(chapter) {
    if (!chapter.isValid()) {
      return;
    }
    this.chapters = insertIntoSortedChapterArray(this.chapters, chapter);
    this.currentChapter = chapter;
    this.updatedAt = Math.max(chapter.updatedAt, this.updatedAt);
  }

  isValid() {
    return (
      typeof this.title === 'string' &&
      typeof this.hostname === 'string' &&
      Array.isArray(this.chapters) &&
      typeof this.currentChapter === 'object' &&
      typeof this.updatedAt === 'number' &&
      !Number.isNaN(this.updatedAt) &&
      (this.deletedAt === null ||
        (typeof this.deletedAt === 'number' && !Number.isNaN(this.deletedAt)))
    );
  }

  isDeleted() {
    return this.deletedAt !== null;
  }
}
