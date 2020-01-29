import {
  SEND_PAGE_PARSER_TYPE,
  PAGE_PARSER_RESULT_TYPE,
  ERROR_MESSAGE_TYPE,
  Message
} from './message';

const applyParserBody = parserBodyString => {
  if (parserBodyString === undefined || parserBodyString === null) {
    return null;
  }

  return Function('pathname', 'document', parserBodyString)(window.location.pathname, document);
};

const getParseResult = pageParser => {
  try {
    return new Message(PAGE_PARSER_RESULT_TYPE, {
      bookTitle: applyParserBody(pageParser.bookTitleParser),
      chapterNumber: applyParserBody(pageParser.chapterNumberParser),
      hostname: window.location.hostname
    });
  } catch (e) {
    return new Message(ERROR_MESSAGE_TYPE, {
      error: e.message,
      hostname: window.location.hostname
    });
  }
};

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  chrome.runtime.onMessage.removeListener();
  if (request.type === SEND_PAGE_PARSER_TYPE) {
    sendResponse(getParseResult(request.data));
  }
});
