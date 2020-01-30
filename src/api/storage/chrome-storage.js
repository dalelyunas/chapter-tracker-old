/* eslint-disable max-classes-per-file */
class Storage {
  constructor(type) {
    this.type = type;
  }

  get(key) {
    return new Promise((resolve) => {
      this.type.get(key, (result) => {
        resolve(result[key] || null);
      });
    });
  }

  set(key, value) {
    return new Promise((resolve) => {
      this.type.set({ [key]: value }, (result) => {
        resolve(result);
      });
    });
  }

  delete(key) {
    return new Promise((resolve) => {
      this.type.remove(key, (result) => {
        resolve(result);
      });
    });
  }

  getAll(startingWith) {
    return new Promise((resolve) => {
      this.type.get(null, (result) => {
        const matching = [];
        Object.keys(result).forEach((key) => {
          if (key.startsWith(startingWith)) {
            matching.push(result[key]);
          }
        });
        resolve(matching);
      });
    });
  }
}

class LocalStorage extends Storage {
  constructor() {
    super(chrome.storage.local);
  }
}

class SyncStorage extends Storage {
  constructor() {
    super(chrome.storage.sync);
  }
}

export const localStorage = new LocalStorage();
export const syncStorage = new SyncStorage();
