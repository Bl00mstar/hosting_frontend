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
