import React, { useEffect } from 'react';
import './index.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import { apiLink } from '@utils/api';
import { tokenConfig } from '@store/user/user.helpers';

const Downloader = ({ files = [], remove }) => {
  const Item = files.map((file, idx) => {
    return (
      <DownloadItem key={idx} removeFile={() => remove(file.id)} {...file} />
    );
  });

  return (
    <div className="downloader">
      <div className="card">
        <div className="card-header">Download notification</div>
        <ul className="list-group list-group-flush">{Item}</ul>
      </div>
    </div>
  );
};

Downloader.propTypes = {
  files: PropTypes.array.isRequired,
  remove: PropTypes.func.isRequired,
};

export default Downloader;

const DownloadItem = ({ id, name, removeFile }) => {
  useEffect(() => {
    setTimeout(() => {
      download(id, name);
    }, 500);
  }, [id, name]);

  useEffect(() => {
    setTimeout(() => {
      removeFile();
    }, 4000);
  }, [removeFile]);

  console.log(id);

  const download = async (id) => {
    let token = await tokenConfig();
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${token.headers['x-auth-token']}`;
    axios({
      url: apiLink + `/media/${id}`,
      method: 'GET',
    })
      .then((response) => {
        const link = document.createElement('a');
        link.href = `${apiLink}/share/${response.data.link}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return <div>Download {name} started.</div>;
};

DownloadItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  removeFile: PropTypes.func.isRequired,
};
