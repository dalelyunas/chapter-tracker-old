import { googleDriveAppData } from './storage/google-drive';

const BOOK_FILE_NAME = 'book.json';
const BOOK_APPLICATION_TYPE = 'application/json';

export const loadBooks = async () => {
  const bookFiles = (await googleDriveAppData.listFiles()).filter(
    (file) => file.name === BOOK_FILE_NAME
  );

  let bookFileId = null;
  if (bookFiles.length < 1) {
    const addBookResult = await googleDriveAppData.addFile(
      BOOK_FILE_NAME,
      BOOK_APPLICATION_TYPE,
      '{}'
    );
    bookFileId = addBookResult.id;
  } else {
    bookFileId = bookFiles[0].id;
  }

  return {
    books: (await googleDriveAppData.getFile(bookFileId)).result,
    fileId: bookFileId
  };
};

export const saveBooks = (fileId, books) => {
  return googleDriveAppData.updateFile(fileId, BOOK_APPLICATION_TYPE, JSON.stringify(books));
};
