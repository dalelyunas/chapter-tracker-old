const notificationTypes = {
  ERROR: 'error',
  INVALID_DATA: 'invalid_data'
};

const sendNotification = (type, title, message, hostname) => {
  chrome.notifications.clear(type, () => {
    chrome.notifications.create(type, {
      title: `${title}: ${hostname}`,
      message,
      type: 'basic',
      iconUrl: 'icons/icon_48.png'
    });
  });
};

export const sendInvalidDataNotification = (data, hostname) => {
  sendNotification(notificationTypes.INVALID_DATA, 'Invalid Data', hostname, JSON.stringify(data));
};

export const sendErrorNotification = (error, hostname) => {
  sendNotification(notificationTypes.ERROR, 'Error', error, hostname);
};
