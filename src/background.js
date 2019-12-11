import { getMatchers } from './storage/matcher';
import { upsertChapter } from './storage/book';

const getHostnameUnsafe = url => {
    const parsed = new URL(url);
    return parsed.hostname;
};

const isValidMatchers = matchers => matchers.bookTitleMatcher !== undefined && matchers.chapterNumberMatcher !== undefined;

const isValidMatchedData = data => data.bookTitle !== undefined && data.chapterNumber !== undefined && data.hostname !== undefined;

const sendMatchers = (matchers, tabId) => {
    if (isValidMatchers(matchers)) {
        const payload = {
            type: 'apply_matchers',
            matchers
        };
        chrome.tabs.sendMessage(tabId, payload, response => {
            console.log(response);
            if (isValidMatchedData(response)) {
                upsertChapter(response.hostname, response.bookTitle, response.chapterNumber);
            }
        });
    }
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (tab.active && changeInfo.url) {
            chrome.tabs.executeScript(tabId, { file: 'match/match-page.js'}, () => {
                getMatchers(getHostnameUnsafe(changeInfo.url)).then(matchers => {
                    sendMatchers(matchers, tabId);
                });
            })
        }
     }
);
