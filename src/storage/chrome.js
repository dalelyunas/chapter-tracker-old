const get = (key, type) => {
  return new Promise(resolve => {
    type.get(key, result => {
      const val = result[key];
      if (val === undefined) {
        resolve(null);
      } else {
        resolve(val);
      }
    });
  });
};

const del = (key, type) => {
  return new Promise(resolve => {
    type.remove(key, result => {
      resolve(result);
    });
  });
};

const getAll = type => {
  return new Promise(resolve => {
    type.get(null, result => {
      resolve(result);
    });
  });
};

const set = (key, value, type) => {
  return new Promise((resolve) => {
    type.set({ [key]: value }, (result) => {
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

export const deleteLocal = key => {
  return del(key, chrome.storage.local)
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

export const deleteSync = key => {
  return del(key, chrome.storage.sync);
};
