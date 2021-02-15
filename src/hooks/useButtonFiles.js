import React, { useState } from 'react';
import FilesButton from '@components/FilesButton';
import FilesCreate from '@components/FilesCreate';
import FilesUploadSingleFile from '@components/FilesUploadSingleFile';
import FilesRename from '@components/FilesRename';
import FilesMove from '@components/FilesMove';
import FilesDeleteToTrash from '@components/FilesDeleteToTrash';

const useButtonFiles = () => {
  const [number, setNumber] = useState(0);

  const filesOptions = (checked) => {
    setNumber(checked.length);
  };

  return [
    (e) => filesOptions(e),
    <FilesButton key={''} buttons={buttons} number={number} />,
  ];
};

export default useButtonFiles;

const buttons = [
  {
    name: 'Create',
    value: 'newfile',
    type: ['all'],
    element: <FilesCreate />,
  },
  {
    name: 'Upload',
    value: 'upload',
    type: ['all'],
    element: <FilesUploadSingleFile />,
  },
  {
    name: 'Rename',
    value: 'rename',
    type: ['checkOne'],
    element: <FilesRename />,
  },
  {
    name: 'Move',
    value: 'move',
    type: ['checkMany', 'checkOne'],
    element: <FilesMove />,
  },
  {
    name: 'Delete',
    value: 'delete',
    type: ['checkMany', 'checkOne'],
    element: <FilesDeleteToTrash />,
  },
];
