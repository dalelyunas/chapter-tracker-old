// Performs an eval to use the matcher function
const performMatch = matcherFunctionString => {
    if (matcherFunctionString === undefined) {
        return undefined;
    }
    return eval(matcherFunction)(window.location.pathname, document);
};

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.type == 'apply_matchers') {
    const matchers = request.matchers;
    console.log('responding');
    sendResponse({
        type: 'matchers_result',
        bookTitle: performMatch(matchers.bookTitleMatcher),
        chapterNumber: performMatch(matchers.chapterNumberMatcher),
        hostname: window.location.hostname
    });
  }
});






