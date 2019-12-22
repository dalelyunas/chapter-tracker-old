// Performs an eval to use the parseer function
const performParse = parserFunctionString => {
    if (parserFunctionString === undefined) {
        return undefined;
    }
    return eval(parserFunction)(window.location.pathname, document);
};

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.type == 'apply_parser') {
    chrome.runtime.onMessage.removeListener();
    const pageParser = request.pageParser;
    console.log('responding');
    sendResponse({
        bookTitle: performParse(pageParser.bookTitleParser),
        chapterNumber: performParse(pageParser.chapterNumberParser),
        hostname: window.location.hostname
    });
  }
});
