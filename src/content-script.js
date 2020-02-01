import { messageTypes, makePageParserAppliedMessage, makeErrorMessage } from './model/Message';

const IGNORE_PARSE_RESULT_VALUE = 'ignore_parse_result';

const isIgnoreResult = (data) =>
  data !== undefined &&
  (data.chapterNumber === IGNORE_PARSE_RESULT_VALUE ||
    data.bookTitle === IGNORE_PARSE_RESULT_VALUE);

const applyParserBody = (parserBodyString) => {
  if (parserBodyString === undefined || parserBodyString === null) {
    return null;
  }

  // eslint-disable-next-line no-new-func
  return Function('pathname', 'document', parserBodyString)(window.location.pathname, document);
};

const getParseResult = (pageParser) => {
  try {
    const parseResult = {
      bookTitle: applyParserBody(pageParser.bookTitleParser),
      chapterNumber: applyParserBody(pageParser.chapterNumberParser)
    };
    return makePageParserAppliedMessage(messageTypes.PAGE_PARSER_APPLIED, {
      ...parseResult,
      hostname: window.location.hostname,
      ignore: isIgnoreResult(parseResult)
    });
  } catch (e) {
    return makeErrorMessage(messageTypes.ERROR, {
      error: e.message,
      hostname: window.location.hostname
    });
  }
};

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  chrome.runtime.onMessage.removeListener();
  switch (message.type) {
    case messageTypes.PAGE_PARSER_SENT:
      sendResponse(getParseResult(message.data));
      break;
    default:
  }
});
