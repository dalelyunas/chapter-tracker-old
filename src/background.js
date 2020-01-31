import { Book } from './api/model/Book';
import { Chapter } from './api/model/Chapter';
import { LastViewedBook } from './api/model/LastViewedBook';
import { getPageParser } from './api/page-parser-api';
import { saveBook, getBook } from './api/book-api';
import { saveLastViewedBook } from './api/last-viewed-book-api';
import {
  SEND_PAGE_PARSER_TYPE,
  PAGE_PARSER_RESULT_TYPE,
  ERROR_MESSAGE_TYPE,
  SYNC_BOOKS,
  Message
} from './message';
import { performBookSync } from './book-sync';

const IGNORE_PARSE_RESULT_VALUE = 'ignore_parse_result';

const getHostnameUnsafe = (url) => {
  return new URL(url).hostname;
};

const isIgnoreResult = (data) =>
  data !== undefined &&
  (data.chapterNumber === IGNORE_PARSE_RESULT_VALUE ||
    data.bookTitle === IGNORE_PARSE_RESULT_VALUE);

const sendNotification = (title, hostname, message) => {
  chrome.notifications.clear('parse_failed', () => {
    chrome.notifications.create('parse_failed', {
      title: title + hostname,
      message,
      type: 'basic',
      iconUrl: 'icons/icon_48.png'
    });
  });
};

const sendInvalidDataNotification = (parseResult) => {
  sendNotification(
    'Invalid data: ',
    parseResult.hostname,
    `Chapter number: ${parseResult.chapterNumber}, Book title: ${parseResult.bookTitle}`
  );
};

const sendErrorNotification = (data) => {
  sendNotification('Error: ', data.hostname, data.error);
};

const storeSeenChapter = async (hostname, bookTitle, chapterNum) => {
  const currentTime = new Date().getTime();
  const book = (await getBook(hostname, bookTitle)) || new Book(hostname, bookTitle, currentTime);
  book.deletedAt = null;
  book.addChapter(new Chapter(chapterNum, currentTime));
  return saveBook(book);
};

const handleResponseMessage = (message) => {
  if (message.type === ERROR_MESSAGE_TYPE) {
    sendErrorNotification(message.data);
  } else if (message.type === PAGE_PARSER_RESULT_TYPE && !isIgnoreResult(message.data)) {
    const parseResult = message.data;
    storeSeenChapter(parseResult.hostname, parseResult.bookTitle, parseResult.chapterNumber)
      .then(() =>
        saveLastViewedBook(new LastViewedBook(parseResult.hostname, parseResult.bookTitle))
      )
      .catch(() => sendInvalidDataNotification(parseResult));
  }
};

const sendPageParser = (pageParser, tabId) => {
  const payload = new Message(SEND_PAGE_PARSER_TYPE, pageParser);
  chrome.tabs.sendMessage(tabId, payload, (response) => {
    handleResponseMessage(response);
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

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === SYNC_BOOKS) {
    performBookSync();
  }
});
