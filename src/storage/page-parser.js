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

const objLiteralToPageParser = obj => {
    if (obj === null) {
        return null;
    }
    return new PageParser(obj.hostname, obj.bookTitleParser, obj.chapterNumberParser);
};

export const getAllPageParsers = async () => {
    const objs = await syncStorage.getAll(PAGE_PARSER_KEY_PREFIX);
    return objs.map(obj => objLiteralToPageParser(obj));
};

export const getPageParserByKey = async hostname => {
    return objLiteralToPageParser(await syncStorage.get(getPageParserKey(hostname)));
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
