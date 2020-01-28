import { localStorage } from './chrome-storage';

const TOMBSTONE_KEY_PREFIX = 'tombstone';

export const getTombstoneKey = (deletedKey) => {
    return TOMBSTONE_KEY_PREFIX + ':' + deletedKey;
};

export class Tombstone {
    constructor(deletedKey, updatedAt) {
        this.deletedKey = deletedKey;
        this.updatedAt = updatedAt;
    }
    isValid() {
        return typeof this.deletedKey === 'string' &&
            typeof this.updatedAt === 'number' &&
            !isNaN(this.updatedAt);
    }
    getKey() {
        return getTombstoneKey(this.deletedKey);
    }
}

export const objLiteralToTombstone = obj => {
    if (obj === null) {
        return null;
    }
    return new Tombstone(obj.deletedKey, obj.updatedAt);
};

export const saveTombstone = tombstone => {
    if (tombstone.isValid()) {
        return localStorage.set(tombstone.getKey(), tombstone);
    } else {
        console.error('Saving invalid tombstone')
        return Promise.reject();
    }
};

export const getAllTombstones = async () => {
    const objs = await localStorage.getAll(TOMBSTONE_KEY_PREFIX);
    return objs.map(obj => objLiteralToTombstone(obj));
};

export const deleteTombstoneByKey = deletedKey => {
    return localStorage.delete(getTombstoneKey(deletedKey));
};

export const getTombstoneByKey = async deletedKey => {
    return objLiteralToTombstone(await localStorage.get(getTombstoneKey(deletedKey)));
};