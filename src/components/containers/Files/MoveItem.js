import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { handleSelected } from '@store/files/file.actions';

const MoveItem = ({ items }) => {
  const [moveButton, setMoveButton] = useState(false);
  useEffect(() => {
    if (items.length > 0) {
      setMoveButton(true);
    } else {
      setMoveButton(false);
    }
  }, [items]);

  return <>{moveButton ? <Button variant="outlined">Move</Button> : <></>}</>;
};

MoveItem.propTypes = {
  items: PropTypes.array.isRequired,
  selected: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.file.action.checked.items,
});

const mapDispatchToProps = (dispatch) => {
  return {
    selected: (x) => dispatch(handleSelected(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoveItem);
