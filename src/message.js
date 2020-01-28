export const ERROR_MESSAGE_TYPE = 'error';
export const SEND_PAGE_PARSER_TYPE = 'send_page_parser';
export const PAGE_PARSER_RESULT_TYPE = 'page_parser_result';
export const SYNC_BOOKS = 'sync_books';

export class Message {
    constructor(type, data) {
        this.type = type;
        this.data = data;
    }
}