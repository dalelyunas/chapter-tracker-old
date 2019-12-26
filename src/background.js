import { getPageParser } from './storage/page-parser';
import { upsertChapter, saveLastViewedBook } from './storage/book';

const getHostnameUnsafe = url => {
    const parsed = new URL(url);
    return parsed.hostname;
};

const isValidParseResult = result => result !== undefined &&
    typeof result.bookTitle === 'string' &&
    typeof result.chapterNumber === 'number' &&
    !isNaN(result.chapterNumber) &&
    typeof result.hostname === 'string';

const isErrorResult = result => result !== undefined && result.error !== undefined;

const isIgnoreResult = result => result !== undefined &&
    (result.chapterNumber === 'ignore_parse_result' ||
        result.bookTitle === 'ignore_parse_result');

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

const handleParseResult = parseResult => {
    if (isValidParseResult(parseResult)) {
        upsertChapter(parseResult.hostname, parseResult.bookTitle, parseResult.chapterNumber);
        saveLastViewedBook(parseResult.hostname, parseResult.bookTitle);
    } else if (isErrorResult(parseResult)) {
        sendErrorNotification(parseResult);
    } else if (isIgnoreResult(parseResult)) {
        // Do nothing
    } else {
        sendInvalidDataNotification(parseResult);
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
