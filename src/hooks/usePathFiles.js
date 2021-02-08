import React, { useState } from 'react';
import FilesPath from '@components/FilesPath';

const usePathFiles = () => {
  const [path, setPath] = useState(() => []);

  const pathFiles = (value) => {
    let pathArray = value.replace(/\//g, '/ ').split(' ');
    pathArray.pop();
    setPath(pathArray);
  };

  return [
    (e) => pathFiles(e),
    path.length > 0 ? <FilesPath path={path} /> : null,
  ];
};

export default usePathFiles;
