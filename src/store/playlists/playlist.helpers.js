import axios from 'axios';
import { tokenConfig } from '@store/user/user.helpers';

export const getPlaylistHelper = async (url) => {
  let token = await tokenConfig();
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${token.headers['x-auth-token']}`;
    axios
      .get(url)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        if (error.response) {
          reject(error.response.data.message);
        } else if (error.request) {
          reject('Cannot connect to server.');
        } else {
          reject(error);
        }
      });
  });
};

export const postPlaylistHelper = async (url, values) => {
  console.log(values);
  let token = await tokenConfig();

  return new Promise((resolve, reject) => {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${token.headers['x-auth-token']}`;
    axios
      .post(url, values)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        if (error.response) {
          reject(error.response.data.message);
        } else if (error.request) {
          reject('Cannot connect to server.');
        } else {
          reject(error);
        }
      });
  });
};

export const deletePlaylistHelper = async (url) => {
  let token = await tokenConfig();
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${token.headers['x-auth-token']}`;
    axios
      .delete(url)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        if (error.response) {
          reject(error.response.data.message);
        } else if (error.request) {
          reject('Cannot connect to server.');
        } else {
          reject(error);
        }
      });
  });
};

export const editPlaylistHelper = async (url, values) => {
  let token = await tokenConfig();
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${token.headers['x-auth-token']}`;
    axios
      .put(url, values)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        if (error.response) {
          reject(error.response.data.message);
        } else if (error.request) {
          reject('Cannot connect to server.');
        } else {
          reject(error);
        }
      });
  });
};
