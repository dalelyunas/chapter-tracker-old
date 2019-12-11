// Get domain
// Send it to background
// matchers come back
// match the page
// send the result to background for saving

const getHostname = () => window.location.hostname;

// Performs an eval to use the matcher function
const performMatch = matcherFunctionString => {
    if (matcherFunctionString === undefined) {
        return undefined;
    }
    return eval(matcherFunction)(getHostname(), document);
};

const getMatchers = port => {
    port.postMessage({ 
        type: 'getMatchers',
        hostname: getHostname()
    });
};

const port = chrome.runtime.connect({name:'match-page'});
port.onMessage.addListener(message => {
    if (message.type === 'sendMatchers') {
        console.log('received matchers');
        const matchers = message.matchers;
        port.postMessage({
            type: 'matcherResult',
            bookTitle: performMatch(matchers.bookTitleMatcher),
            chapterNumber: performMatch(matchers.chapterNumberMatcher),
            hostname: getHostname()
        });
    } else if (message.type === 'tabUpdated') {
        getMatchers(port);
    }
});

getMatchers(port);
