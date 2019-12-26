import { setSync, getAllSync, getSync, deleteSync } from './chrome';

const PAGE_PARSER_KEY_PREFIX = 'page_parser';

const getPageParserKey = hostname => {
    return PAGE_PARSER_KEY_PREFIX + ':' + hostname;
};

export const getAllPageParsers = async () => {
    const allItems = await getAllSync();
    const parserItems = []
    for (let key of Object.keys(allItems)) {
        if (key.startsWith(PAGE_PARSER_KEY_PREFIX)) {
            parserItems.push(allItems[key]);
        }
    }
    return parserItems;
};

export const isValidPageParser = pageParser => {
    return typeof pageParser.bookTitleParser === 'string' &&
        typeof pageParser.chapterNumberParser === 'string' &&
        typeof pageParser.hostname === 'string';
}

export const getPageParser = async hostname => {
    return await getSync(getPageParserKey(hostname));
};

export const upsertPageParser = async (pageParser) => {
    if (isValidPageParser(pageParser)) {
        setSync(getPageParserKey(pageParser.hostname), pageParser);
    } else {
        console.error('Saving invalid parser')
    }
};

export const deletePageParser = async hostname => {
    return await deleteSync(getPageParserKey(hostname));
};