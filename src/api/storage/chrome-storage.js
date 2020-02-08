const makeChromeStorage = (type) => ({
  get: (key) => {
    return new Promise((resolve) => {
      type.get(key, (result) => {
        resolve(result[key] || null);
      });
    });
  },

  set: (key, value) => {
    return new Promise((resolve) => {
      type.set({ [key]: value }, (result) => {
        resolve(result);
      });
    });
  },

  delete: (key) => {
    return new Promise((resolve) => {
      type.remove(key, (result) => {
        resolve(result);
      });
    });
  },

  getAllArray: (startingWith) => {
    return new Promise((resolve) => {
      type.get(null, (result) => {
        const matching = [];
        Object.keys(result).forEach((key) => {
          if (key.startsWith(startingWith)) {
            matching.push(result[key]);
          }
        });
        resolve(matching);
      });
    });
  },

  getAllObject: (startingWith) => {
    return new Promise((resolve) => {
      type.get(null, (result) => {
        const matching = {};
        Object.keys(result).forEach((key) => {
          if (key.startsWith(startingWith)) {
            matching[key] = result[key];
          }
        });
        resolve(matching);
      });
    });
  }
});

export const localStorage = makeChromeStorage(chrome.storage.local);
export const syncStorage = makeChromeStorage(chrome.storage.sync);
