const get = (key, type) => {
    return new Promise(resolve => {
      type.get(key, result => {
        if (result !== undefined) {
          resolve(result[key]);
        } else {
          resolve(null);
        }
      });
    });
};

const getAll = type => {
    return get(null, type);
};

const set = (key, value, type) => {
    return new Promise((resolve) => {
      type.set({[key]: value }, (result) => {
        resolve(result);
      });
    });
};

export const getLocal = key => {
  return get(key, chrome.storage.local);
};

export const setLocal = async (key, value) => {
  return set(key, value, chrome.storage.local);
};

export const getAllLocal = () => {
  return getAll(chrome.storage.local);
};

export const getSync = key => {
  return get(key, chrome.storage.sync);
};

export const setSync = (key, value) => {
  return set(key, value, chrome.storage.sync);
};

export const getAllSync = () => {
  return getAll(chrome.storage.sync);
};
