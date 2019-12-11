import { getMatcher } from './storage/matcher';
import { upsertChapter } from './storage/book';

const getHostnameUnsafe = url => {
    const parsed = new URL(url);
    return parsed.hostname;
};

const isValidmatcher = matcher => matcher.bookTitleMatcher !== undefined && matcher.chapterNumberMatcher !== undefined;

const isValidMatchedData = data => data.bookTitle !== undefined && data.chapterNumber !== undefined && data.hostname !== undefined;

const sendMatcher = (matcher, tabId) => {
    const payload = {
        type: 'apply_matcher',
        matcher
    };
    chrome.tabs.sendMessage(tabId, payload, response => {
        console.log(response);
        if (isValidMatchedData(response)) {
            upsertChapter(response.hostname, response.bookTitle, response.chapterNumber);
        }
    });
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (tab.active && changeInfo.url) {
            getMatcher(getHostnameUnsafe(changeInfo.url)).then(matcher => {
                if (isValidmatcher(matcher)) {
                    chrome.tabs.executeScript(tabId, { file: 'match/match-page.js'}, () => {
                        sendMatcher(matcher, tabId);
                    });
                }
            })
        }
     }
);
