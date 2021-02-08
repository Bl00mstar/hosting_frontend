import React from 'react';
import PropTypes from 'prop-types';

const FilesPath = ({ path = [] }) => {
  const Buttons = path.map((button, idx) => {
    return <button key={idx}>{button}</button>;
  });

  return <>{Buttons}</>;
};

FilesPath.propTypes = {
  path: PropTypes.array.isRequired,
};

export default FilesPath;
