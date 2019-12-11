import { getMatchers } from './storage/matcher';
import { upsertChapter } from './storage/book';

const getHostnameUnsafe = url => {
    const parsed = new URL(url);
    return parsed.hostname;
};

const sendMatchers = (matchers, tabId) => {
    if (matchers.bookTitleMatcher !== undefined && matchers.chapterNumberMatcher !== undefined) {
        const payload = {
            type: 'apply_matchers',
            matchers
        };
        chrome.tabs.sendMessage(tabId, payload, response => {
            if (chrome.runtime.lastError) {
                setTimeout(() => sendMatchers(matchers, tabId), 500);
            } else {
                console.log(response);
                if (response.bookTitle !== undefined && response.chapterNumber !== undefined && response.hostname !== undefined) {
                    upsertChapter(response.hostname, response.bookTitle, response.chapterNumber);
                }
            }
        });
    }
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (tab.active && changeInfo.url) {
            getMatchers(getHostnameUnsafe(changeInfo.url)).then(matchers => {
                console.log('sending');
                sendMatchers(matchers, tabId);
            });
        }
     }
);
