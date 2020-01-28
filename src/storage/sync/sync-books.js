import { Book, insertIntoSortedChapterArray, getAllBooks, saveBook } from "../book";
import { Tombstone, getAllTombstones, getTombstoneKey, saveTombstone } from "../tombstone";

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

const mergeTombstone = (local, remote) => {
    return new Tombstone(local.deletedKey, Math.max(local.updatedAt, remote.updatedAt));
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

const applyTombstones = (books, tombstones) => {
    const appliedTombstones = {};
    const keptBooks = {};
    for (let [bookKey, book] of Object.entries(books)) {
        const tombstone = tombstones[getTombstoneKey(bookKey)]
        if (tombstone !== undefined && tombstone.updatedAt > book.updatedAt) {
            appliedTombstones[tombstoneKey] = tombstone;
        } else {
            keptBooks[bookKey] = book;
        }
    }

    return {
        keptBooks,
        appliedTombstones
    }
};

const performBookSync = async () => {
    // Get from drive

    // Merge items
    const books = mergeObjects(await getAllBooks(), {}, mergeBook);
    const tombstones = mergeObjects(await getAllTombstones(), {}, mergeTombstone);

    const { keptBooks, appliedTombstones } = applyTombstones(books, tombstones);

    // Save to local storage
    Object.values(keptBooks).forEach(book => saveBook(book));
    Object.values(appliedTombstones).forEach(tombstone => saveTombstone(tombstone));

    // Save to drive
};

