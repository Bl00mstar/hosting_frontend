import React from 'react';
import './index.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import { tokenConfig } from '@store/user/user.helpers';

const Downloader = ({ files = [] }) => {
  const Item = files.map((file, key) => {
    console.log(files);
    console.log(file);

    return (
      <div key={key}>
        <button onClick={() => download(file.id, file.name)}>
          {file.name}
        </button>
      </div>
    );
  });

  const download = async (id, name) => {
    let token = await tokenConfig();
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${token.headers['x-auth-token']}`;
    axios({
      url: 'http://192.168.55.100:9000' + `/media/${id}`,
      method: 'GET',
      responseType: 'blob',
      onDownloadProgress: (progressEvent) => {
        let percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(percentCompleted);
      },
    })
      .then((response) => {
        console.log(response.data);
        const url = window.URL.createObjectURL(
          new Blob([response.data], {
            type: response.headers['content-type'],
          })
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', name);
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="downloader">
      <div className="card">
        <div className="card-header">File Downloader</div>
        <ul className="list-group list-group-flush">{Item}</ul>
      </div>
    </div>
  );
};

Downloader.propTypes = {
  files: PropTypes.array.isRequired,
};

// const DownloadItem = async ({ file }) => {
//   //   let token = await tokenConfig();
//   const { id, name } = file;
//   console.log(id);
//   console.log(name);

//   return (
//     <div>
//       <button onClick={() => download()}>asd</button>
//     </div>
//   );
// };

// DownloadItem.propTypes = {
//   file: PropTypes.object.isRequired,
// };

export default Downloader;
