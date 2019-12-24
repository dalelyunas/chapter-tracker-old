import { getPageParser } from './storage/page-parser';
import { upsertChapter } from './storage/book';

const getHostnameUnsafe = url => {
    const parsed = new URL(url);
    return parsed.hostname;
};

const isValidParsedData = data => data.bookTitle !== undefined && data.chapterNumber !== undefined && data.hostname !== undefined;

const sendPageParser = (pageParser, tabId) => {
    const payload = {
        type: 'apply_parser',
        pageParser
    };
    chrome.tabs.sendMessage(tabId, payload, response => {
        if (isValidParsedData(response)) {
            upsertChapter(response.hostname, response.bookTitle, response.chapterNumber);
        }
    });
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.active && changeInfo.url) {
        getPageParser(getHostnameUnsafe(changeInfo.url)).then(pageParser => {
            if (pageParser !== null) {
                chrome.tabs.executeScript(tabId, { file: 'parser/parse-page.js' }, () => {
                    sendPageParser(pageParser, tabId);
                });
            }
        });
    }
});
