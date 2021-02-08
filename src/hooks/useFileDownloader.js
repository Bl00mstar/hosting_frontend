import Downloader from '../containers/Downloader/index';
import React, { useState } from 'react';

const useFileDownloader = () => {
  const [files, setFiles] = useState(() => []);

  const download = (file) => {
    setFiles((fileList) => [...fileList, { ...file }]);
  };

  const remove = (removeId) =>
    setFiles((files) => [...files.filter((file) => file.id !== removeId)]);

  return [
    (e) => download(e),
    files.length > 0 ? (
      <Downloader files={files} remove={(e) => remove(e)} />
    ) : null,
  ];
};

export default useFileDownloader;
