import { getPageParser } from './storage/page-parser';
import { Book, saveBook, getBookByKey } from './storage/book';

const IGNORE_PARSE_RESULT_VALUE = 'ignore_parse_result';

const getHostnameUnsafe = url => {
    return new URL(url).hostname;
};

const isErrorResult = result => result !== undefined && result.error !== undefined;

const isIgnoreResult = result => result !== undefined &&
    (result.chapterNumber === IGNORE_PARSE_RESULT_VALUE ||
        result.bookTitle === IGNORE_PARSE_RESULT_VALUE);

const sendNotification = (title, hostname, message) => {
    chrome.notifications.clear('parse_failed', () => {
        chrome.notifications.create('parse_failed', {
            title: title + hostname,
            message,
            type: 'basic',
            iconUrl: 'icons/icon_48.png'
        });
    })
};

const sendInvalidDataNotification = parseResult => {
    sendNotification('Invalid data: ',
        parseResult.hostname,
        'Chapter number: ' + parseResult.chapterNumber + ', ' +
        'Book title: ' + parseResult.bookTitle
    );
};

const sendErrorNotification = parseResult => {
    sendNotification('Error: ', parseResult.hostname, parseResult.error);
};

export const storeSeenChapter = async (hostname, bookTitle, chapterNum) => {
    const book = await getBookByKey(hostname, bookTitle) || new Book(hostname, title, [], null);
    book.addChapter(chapterNum);

    if (book.isValid()) {
        return saveBook(book);
    } else {
        return Promise.reject();
    }
};

const handleParseResult = parseResult => {
    if (isErrorResult(parseResult)) {
        sendErrorNotification(parseResult);
    } else if (!isIgnoreResult(parseResult)) {
        storeSeenChapter(parseResult.hostname, parseResult.bookTitle, parseResult.chapterNumber)
            .catch(() => sendInvalidDataNotification(parseResult));
    }
};

const sendPageParser = (pageParser, tabId) => {
    const payload = {
        type: 'apply_parser',
        pageParser
    };
    chrome.tabs.sendMessage(tabId, payload, parseResult => {
        handleParseResult(parseResult);
    });
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.active && changeInfo.url) {
        getPageParser(getHostnameUnsafe(changeInfo.url)).then(pageParser => {
            if (pageParser !== null) {
                chrome.tabs.executeScript(tabId, { file: 'content-script.js' }, () => {
                    sendPageParser(pageParser, tabId);
                });
            }
        });
    }
});
