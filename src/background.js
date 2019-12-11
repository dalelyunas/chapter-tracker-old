import { getPageParsers } from './storage/page-parsers';
import { upsertChapter } from './storage/book';

const getHostnameUnsafe = url => {
    const parsed = new URL(url);
    return parsed.hostname;
};

const isValidPageParsers = pageParsers => true; //pageParsers.bookTitleParser !== undefined && pageParsers.chapterNumberParser !== undefined;

const isValidParsedData = data => data.bookTitle !== undefined && data.chapterNumber !== undefined && data.hostname !== undefined;

const sendPageParsers = (pageParsers, tabId) => {
    const payload = {
        type: 'apply_parsers',
        pageParsers
    };
    chrome.tabs.sendMessage(tabId, payload, response => {
        console.log(response);
        if (isValidParsedData(response)) {
            upsertChapter(response.hostname, response.bookTitle, response.chapterNumber);
        }
    });
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.active && changeInfo.url) {
        getPageParsers(getHostnameUnsafe(changeInfo.url)).then(pageParsers => {
            if (isValidPageParsers(pageParsers)) {
                chrome.tabs.executeScript(tabId, { file: 'parser/parse-page.js'}, () => {
                    sendPageParsers(pageParsers, tabId);
                });
            }
        });
    }
});
