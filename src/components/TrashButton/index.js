import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const TrashButton = ({ buttons = [] }) => {
  const Buttons = buttons.map(({ name, value, type }, idx) => {
    if (type.includes('oneOrMany')) {
      return (
        <Button
          size="small"
          variant="outlined"
          value={value}
          key={idx}
          style={{ margin: '1px', minWidth: '8px' }}
        >
          {name}
        </Button>
      );
    }
  });

  return <div>{Buttons}</div>;
};

TrashButton.propTypes = {
  buttons: PropTypes.array,
};

export default TrashButton;
