// Performs an eval to use the parseer function
const performParse = parserFunctionString => {
  if (parserFunctionString === undefined) {
    return undefined;
  }

  try {
    return Function("pathname", "document", parserFunctionString)(window.location.pathname, document);
  } catch (e) {
    return undefined;
  }
};

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  chrome.runtime.onMessage.removeListener();
  if (request.type == 'apply_parser') {
    const pageParser = request.pageParser;
    sendResponse({
      bookTitle: performParse(pageParser.bookTitleParser),
      chapterNumber: performParse(pageParser.chapterNumberParser),
      hostname: window.location.hostname
    });
  }
});
