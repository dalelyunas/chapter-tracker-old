const applyParserBody = parserBodyString => {
  if (parserBodyString === undefined || parserBodyString === null) {
    return null;
  }

  return Function('pathname', 'document', parserBodyString)(window.location.pathname, document);
};

const getParseResult = pageParser => {
  try {
    return {
      bookTitle: applyParserBody(pageParser.bookTitleParser),
      chapterNumber: applyParserBody(pageParser.chapterNumberParser),
      hostname: window.location.hostname
    };
  } catch (e) {
    return {
      error: e.message,
      hostname: window.location.hostname
    };
  }
};

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  chrome.runtime.onMessage.removeListener();
  if (request.type == 'apply_parser') {
    sendResponse(getParseResult(request.pageParser))
  }
});
