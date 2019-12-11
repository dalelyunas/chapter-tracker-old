// Performs an eval to use the parseer function
const performParse = parserFunctionString => {
    if (parserFunctionString === undefined) {
        return undefined;
    }
    return eval(parserFunction)(window.location.pathname, document);
};

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.type == 'apply_parsers') {
    const pageParsers = request.pageParsers;
    console.log('responding');
    sendResponse({
        bookTitle: performParse(pageParsers.bookTitleParser),
        chapterNumber: performParse(pageParsers.chapterNumberParser),
        hostname: window.location.hostname
    });
  }
});
