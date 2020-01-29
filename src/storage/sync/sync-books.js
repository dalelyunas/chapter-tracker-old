import { Book, insertIntoSortedChapterArray, listBooks, saveBook } from "../book";

const mergeBook = (local, remote) => {
    const combinedChapters = [];
    for (let chapter of [...local.chapters, ...remote.chapters]) {
        combinedChapters = insertIntoSortedChapterArray(combinedChapters, chapter);
    }

    const localCur = local.currentChapter;
    const remoteCur = remote.currentChapter;
    const currentChapter = localCur.updatedAt > remoteCur.updatedAt ? localCur : remoteCur;
    const updatedAt = Math.max(local.updatedAt, remote.updatedAt);

    return new Book(remote.hostname, remote.title, combinedChapters, currentChapter, updatedAt);
};

const mergeObjects = (local, remote, mergeFunc) => {
    const combined = { ...local };
    for (let key of Object.keys(remote)) {
        if (key in combined) {
            combined[key] = mergeFunc(combined[key], remote[key]);
        } else {
            combined[key] = remote[key];
        }
    }

    return combined;
};

const performBookSync = async () => {
    // Get from drive

    // Merge items
    const books = mergeObjects(await getAllBooks(), {}, mergeBook);

    // Save to local storage

    // Save to drive
};

