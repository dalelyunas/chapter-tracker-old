import { getMatchers } from './storage/matcher';
import { upsertChapter } from './storage/book';

chrome.runtime.onConnect.addListener(port => {
    port.onMessage.addListener(message => {
        if (message.type === 'matcherResult') {
           
        } else if (message.type === 'getMatchers') {
            getMatchers(message.hostname).then(matchers => {
                console.log('matchers');
                if (matchers.bookTitleMatcher !== undefined && matchers.chapterNumberMatcher !== undefined) {
                    port.postMessage({
                        type: 'sendMatchers',
                        matchers
                    });
                }
            })
        }
    });

const getHostname = url => {
    const parsed = new URL(url);
    return parsed.hostname;
}

const handleResponse = resp => {
    upsertChapter(resp.hostname, resp.bookTitle, resp.chapterNumber);
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        console.log('detected');
        if (tab.active && changeInfo.url) {
            getMatchers(getHostname(changeInfo.url)).then(matchers => {
                console.log('sending: ' + tabId + ' ' + changeInfo.url )
                if (true || (matchers.bookTitleMatcher !== undefined && matchers.chapterNumberMatcher !== undefined)) {
                    const payload = {
                        type: 'apply_matchers',
                        matchers
                    };
                    chrome.runtime.sendMessage(tabId, payload, handleResponse);
                }
            });
        }
     });
});

