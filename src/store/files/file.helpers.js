import axios from 'axios';
import { tokenConfig } from '@store/user/user.helpers';

export const fileRequest = async (url) => {
  let token = await tokenConfig();

  return new Promise((resolve, reject) => {
    console.log(url);
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${token.headers['x-auth-token']}`;
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        resolve(res.data);
      })
      .catch((error) => {
        if (error.response) {
          // Validation Error
          reject(error.response.data.message);
        } else if (error.request) {
          //Cannot connect to server
          //error.request
          reject('Cannot connect to server.');
        } else {
          reject(error);
        }
      });
  });
};

export const download = async (url) => {
  console.log(url);
  let token = await tokenConfig();
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${token.headers['x-auth-token']}`;
    axios({
      url: url,
      method: 'GET',
      responseType: 'blob',
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

export const postPathGetFiles = async (url, values) => {
  let token = await tokenConfig();

  return new Promise((resolve, reject) => {
    console.log(values);
    console.log(url);
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${token.headers['x-auth-token']}`;
    axios
      .post(url, { values })
      .then((res) => {
        console.log(res);
        resolve(res.data);
      })
      .catch((error) => {
        if (error.response) {
          // Validation Error
          console.log(error.response.data.msg);
          reject(error.response.data.message);
        } else if (error.request) {
          //Cannot connect to server
          //error.request
          reject('Cannot connect to server.');
        } else {
          reject(error);
        }
      });
  });
};
