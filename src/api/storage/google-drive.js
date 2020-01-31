import { GOOGLE_DRIVE_API_KEY } from '../../keys';

const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
const API_ROOT = 'https://www.googleapis.com/upload/drive/v3/files';
const APP_DATA_FOLDER = 'appDataFolder';

export class GoogleDriveAppData {
  constructor() {
    this.gapiReady = false;
  }

  static getAuthToken() {
    return new Promise((resolve, reject) => {
      chrome.identity.getAuthToken(
        {
          interactive: true
        },
        (token) => {
          if (chrome.runtime.lastError) {
            reject();
          } else {
            resolve(token);
          }
        }
      );
    });
  }

  async initGapi() {
    await gapi.client.init({
      apiKey: GOOGLE_DRIVE_API_KEY,
      discoveryDocs: DISCOVERY_DOCS
    });
    this.gapiReady = true;
  }

  async authenticateGapi() {
    if (this.gapiReady === false) {
      await this.initGapi();
    }
    const token = await GoogleDriveAppData.getAuthToken();
    gapi.auth.setToken({
      access_token: token
    });
  }

  async getFile(fileId) {
    await this.authenticateGapi();
    const resp = await gapi.client.drive.files.get({
      fileId,
      alt: 'media'
    });
    return resp;
  }

  async listFiles() {
    await this.authenticateGapi();
    let result = [];
    const initialResp = await gapi.client.drive.files.list({ spaces: APP_DATA_FOLDER });
    result = result.concat(initialResp.result.files);
    let { nextPageToken } = initialResp.result;

    while (nextPageToken) {
      // eslint-disable-next-line no-await-in-loop
      const resp = await gapi.client.drive.files.list({
        pageToken: nextPageToken,
        spaces: APP_DATA_FOLDER
      });
      result = result.concat(resp.result.files);
      nextPageToken = resp.result.nextPageToken;
    }

    return result;
  }

  async deleteFile(fileId) {
    await this.authenticateGapi();
    return gapi.client.drive.files.delete({ fileId });
  }

  async updateFile(fileId, fileType, dataString) {
    await this.authenticateGapi();
    return new Promise((resolve, reject) => {
      const file = new Blob([dataString], { type: fileType });

      const xhr = new XMLHttpRequest();
      xhr.open('patch', `${API_ROOT}/${fileId}?uploadType=media`);
      xhr.setRequestHeader('Authorization', `Bearer ${gapi.auth.getToken().access_token}`);
      xhr.responseType = 'json';
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = () => {
        reject(xhr.lastError);
      };
      xhr.send(file);
    });
  }

  async addFile(fileName, fileType, dataString) {
    await this.authenticateGapi();
    return new Promise((resolve, reject) => {
      const file = new Blob([dataString], { type: fileType });
      const metadata = {
        name: fileName,
        mimeType: fileType,
        parents: [APP_DATA_FOLDER]
      };

      const form = new FormData();
      form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
      form.append('file', file);

      const xhr = new XMLHttpRequest();
      xhr.open('post', `${API_ROOT}?uploadType=multipart&fields=id`);
      xhr.setRequestHeader('Authorization', `Bearer ${gapi.auth.getToken().access_token}`);
      xhr.responseType = 'json';
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = () => {
        reject(xhr.lastError);
      };
      xhr.send(form);
    });
  }
}

export const googleDriveAppData = new GoogleDriveAppData();
