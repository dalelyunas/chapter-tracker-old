export const get = (key) => {
    return new Promise((resolve) => {
      chrome.storage.local.get(key, (result) => {
        resolve(result[key]);
      });
    });
};

export const getAll = () => {
    return get(null);
};

export const set = (key, value) => {
    return new Promise((resolve) => {
      chrome.storage.local.set({[key]: value }, (result) => {
        resolve(result);
      });
    });
};
