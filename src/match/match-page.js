// Performs an eval to use the matcher function
const performMatch = matcherFunctionString => {
    if (matcherFunctionString === undefined) {
        return undefined;
    }
    return eval(matcherFunction)(window.location.pathname, document);
};

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.type == 'apply_matcher') {
    const matcher = request.matcher;
    console.log('responding');
    sendResponse({
        type: 'matcher_result',
        bookTitle: performMatch(matcher.bookTitleMatcher),
        chapterNumber: performMatch(matcher.chapterNumberMatcher),
        hostname: window.location.hostname
    });
  }
});
