import axios from 'axios';

export const userRequest = (method, url, data) => {
  return new Promise((resolve, reject) => {
    const requestConfig = {
      method,
      data,
      timeout: 10000,
      url,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios(requestConfig)
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
          console.log('?');
          reject(error);
        }
      });
  });
};

export const isAuthenticated = async (method, url) => {
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

export const tokenConfig = () => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  if (localStorage.getItem('authorization')) {
    config.headers['x-auth-token'] = localStorage.getItem('authorization');
  }
  return config;
};
