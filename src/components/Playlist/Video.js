/*eslint-disable*/
import React from 'react';
import { apiLink } from '@utils/api';

export default function Video(props) {
  const { _id, storage } = props.file;
  return (
    <>
      <video
        key={_id}
        style={{ width: '100%', height: 'auto' }}
        controls
        controlsList="nodownload"
      >
        <source src={`${apiLink}/share/movie/${storage}/${_id}`} />
      </video>
    </>
  );
}
