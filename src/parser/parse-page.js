// Performs an eval to use the parseer function
const performParse = parserFunctionString => {
  if (parserFunctionString === undefined) {
    return undefined;
  }

  try {
    return Function('pathname', 'document', parserFunctionString)(window.location.pathname, document);
  } catch (e) {
    alert('Exception when parsing data: ' + e);
    return undefined;
  }
};

const isValidParsedData = data => data !== undefined && data.bookTitle !== undefined && data.chapterNumber !== undefined && data.hostname !== undefined;

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  chrome.runtime.onMessage.removeListener();
  if (request.type == 'apply_parser') {
    const pageParser = request.pageParser;
    const parsedData = {
      bookTitle: performParse(pageParser.bookTitleParser),
      chapterNumber: performParse(pageParser.chapterNumberParser),
      hostname: window.location.hostname
    };

    if (isValidParsedData(parsedData)) {
      sendResponse(parsedData);
    } else {
      alert('Parsed data is invalid');
    }
  }
});
