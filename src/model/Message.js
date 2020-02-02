export const messageTypes = {
  ERROR: 'error',
  PAGE_PARSER_SENT: 'page_parser_sent',
  PAGE_PARSER_APPLIED: 'page_parser_applied',
  BOOK_SYNC_REQUESTED: 'book_sync_requested',
  BOOK_SYNC_COMPLETED: 'book_sync_completed'
};

export const makeMessage = (type, data) => {
  return Object.freeze({
    type,
    data
  });
};

export const makeErrorMessage = (error, hostname) => {
  return makeMessage(messageTypes.ERROR, { error, hostname });
};

export const makePageParserSentMessage = (pageParser) => {
  return makeMessage(messageTypes.PAGE_PARSER_SENT, pageParser);
};

export const makePageParserAppliedMessage = (parseResult) => {
  return makeMessage(messageTypes.PAGE_PARSER_APPLIED, parseResult);
};

export const makeBookSyncRequestedMessage = () => {
  return makeMessage(messageTypes.BOOK_SYNC_REQUESTED, {});
};

export const makeBookSyncCompletedMessage = () => {
  return makeMessage(messageTypes.BOOK_SYNC_COMPLETED, {});
};
