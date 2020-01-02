import { syncStorage } from './chrome';

const PAGE_PARSER_KEY_PREFIX = 'page_parser';

const getPageParserKey = hostname => {
    return PAGE_PARSER_KEY_PREFIX + ':' + hostname;
};

export class PageParser {
    constructor(hostname, bookTitleParser, chapterNumberParser) {
        this.hostname = hostname;
        this.bookTitleParser = bookTitleParser;
        this.chapterNumberParser = chapterNumberParser;
    }
    isValid() {
        return typeof this.bookTitleParser === 'string' &&
            typeof this.chapterNumberParser === 'string' &&
            typeof this.hostname === 'string';
    }
    getKey() {
        return getPageParserKey(this.hostname);
    }
}

export const getAllPageParsers = () => {
    return syncStorage.getAll(PAGE_PARSER_KEY_PREFIX);
};

export const getPageParserByKey = hostname => {
    return syncStorage.get(getPageParserKey(hostname));
};

export const savePageParser = pageParser => {
    if (pageParser.isValid()) {
        return syncStorage.set(pageParser.getKey(), pageParser);
    } else {
        console.error('Saving invalid parser')
        return Promise.reject();
    }
};

export const deletePageParserByKey = hostname => {
    return syncStorage.delete(getPageParserKey(hostname));
};
