import React, { useState } from 'react';
import FilesButton from '@components/FilesButton';

const useButtonFiles = () => {
  const [number, setNumber] = useState(0);

  const filesOptions = (checked) => {
    setNumber(checked.length);
  };

  return [
    (e) => filesOptions(e),
    <FilesButton key={'a'} buttons={buttons} number={number} />,
  ];
};

export default useButtonFiles;

const buttons = [
  {
    name: 'Create file',
    value: 'newfile',
    type: ['all'],
    element: <div>new file</div>,
  },
  {
    name: 'Upload file',
    value: 'upload',
    type: ['all'],
    element: <div>upload</div>,
  },
  {
    name: 'Rename',
    value: 'rename',
    type: ['checkOne'],
    element: <div>rename</div>,
  },
  {
    name: 'Move',
    value: 'move',
    type: ['checkMany', 'checkOne'],
    element: <div>move</div>,
  },
  {
    name: 'Delete',
    value: 'delete',
    type: ['checkMany', 'checkOne'],
    element: <div>delete</div>,
  },
];
