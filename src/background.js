import * as Book from './model/Book';
import { makeLastViewedBook } from './model/LastViewedBook';
import { getPageParser } from './api/page-parser-api';
import { saveBook, getBook } from './api/book-api';
import { saveLastViewedBook } from './api/last-viewed-book-api';
import {
  messageTypes,
  makePageParserSentMessage,
  makeBookSyncCompletedMessage,
  makeErrorMessage
} from './model/Message';
import { performBookSync } from './book-sync';
import { sendInvalidDataNotification, sendErrorNotification } from './api/notification-api';

const getHostnameUnsafe = (url) => {
  return new URL(url).hostname;
};

const storeChapter = async (hostname, bookTitle, chapterNum) => {
  const currentTime = new Date().getTime();
  const book =
    (await getBook(hostname, bookTitle)) || Book.makeBook(hostname, bookTitle, currentTime);

  const chapter = Book.makeChapter(chapterNum, currentTime);
  return saveBook(Book.restoreBook(Book.addChapter(book, chapter)));
};

const processParseResult = (parseResult) => {
  if (!parseResult.ignore) {
    storeChapter(parseResult.hostname, parseResult.bookTitle, parseResult.chapterNumber)
      .then(() =>
        saveLastViewedBook(makeLastViewedBook(parseResult.hostname, parseResult.bookTitle))
      )
      .catch(() => sendInvalidDataNotification(parseResult, parseResult.hostname));
  }
};

const processResponseMessage = (message) => {
  switch (message.type) {
    case messageTypes.ERROR:
      sendErrorNotification(message.data.error, message.data.hostname);
      break;

    case messageTypes.PAGE_PARSER_APPLIED:
      processParseResult(message.data);
      break;

    default:
  }
};

const sendPageParser = (pageParser, tabId) => {
  chrome.tabs.sendMessage(tabId, makePageParserSentMessage(pageParser), (response) => {
    processResponseMessage(response);
  });
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.url) {
    getPageParser(getHostnameUnsafe(changeInfo.url)).then((pageParser) => {
      if (pageParser !== null) {
        chrome.tabs.executeScript(tabId, { file: 'content-script.js' }, () => {
          sendPageParser(pageParser, tabId);
        });
      }
    });
  }
});

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  switch (message.type) {
    case messageTypes.BOOK_SYNC_REQUESTED:
      performBookSync()
        .then(() => {
          sendResponse(makeBookSyncCompletedMessage());
        })
        .catch(() => sendResponse(makeErrorMessage()));
      break;
    default:
  }
  return true;
});
