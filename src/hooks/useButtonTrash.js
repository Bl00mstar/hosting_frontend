import React, { useState } from 'react';
import TrashButton from '@components/TrashButton';
import TrashRestore from '@components/TrashRestore';
import TrashDelete from '@components/TrashDelete';

const useButtonTrash = () => {
  const [number, setNumber] = useState(0);

  const trashOptions = (checked) => {
    setNumber(checked.length);
  };

  return [
    (e) => trashOptions(e),
    <TrashButton key={''} buttons={buttons} number={number} />,
  ];
};

export default useButtonTrash;

const buttons = [
  {
    name: 'Restore',
    value: 'restore',
    type: ['oneOrMany'],
    element: <TrashRestore />,
  },
  {
    name: 'Delete',
    value: 'delete',
    type: ['oneOrMany'],
    element: <TrashDelete />,
  },
];
