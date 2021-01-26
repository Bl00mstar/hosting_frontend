import React from 'react';
import PropTypes from 'prop-types';

const Source = ({ children }) => {
  return (
    <div className="band row justify-content-around mt-5 p-10">{children}</div>
  );
};

Source.propTypes = {
  children: PropTypes.node,
};

export default Source;
