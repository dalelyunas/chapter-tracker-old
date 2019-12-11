// Performs an eval to use the matcher function
const performMatch = matcherFunctionString => {
    if (matcherFunctionString === undefined) {
        return undefined;
    }
    return eval(matcherFunction)(getHostname(), document);
};

const listener = (request, sender, sendResponse) => {
  if (request.type == 'apply_matchers') {
    const matchers = request.matchers;
    console.log('responding');
    sendResponse({
        type: 'matchers_result',
        bookTitle: performMatch(matchers.bookTitleMatcher),
        chapterNumber: performMatch(matchers.chapterNumberMatcher),
        hostname: window.location.hostname
    });
    chrome.runtime.onMessage.addListener(listener);
  }
};

chrome.runtime.onMessage.addListener(listener);






