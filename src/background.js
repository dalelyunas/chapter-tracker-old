import { getMatchers } from './storage/matcher';
import { upsertChapter } from './storage/book';

chrome.runtime.onConnect.addListener(port => {
    port.onMessage.addListener(message => {
        if (message.type === 'matcherResult') {
            upsertChapter(message.hostname, message.bookTitle, message.chapterNumber);
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

    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        console.log('detected');
        port.postMessage({ 
            type: 'tabUpdated'
        });
     });
});

