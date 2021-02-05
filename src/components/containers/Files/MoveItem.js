import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { getFolders } from '@store/files/file.actions';

export const MoveItem = ({ item, moveIsClicked }) => {
  const [moveButton, setMoveButton] = useState(false);

  useEffect(() => {
    if (item.length > 0) {
      setMoveButton(true);
    } else {
      setMoveButton(false);
    }
  }, [item]);

  return (
    <>
      {moveButton ? (
        <Button
          variant="outlined"
          style={{ marginRight: '5px', marginTop: '5px' }}
          onClick={moveIsClicked}
        >
          Move
        </Button>
      ) : (
        <></>
      )}
    </>
  );
};

MoveItem.propTypes = {
  item: PropTypes.array.isRequired,
  getFolders: PropTypes.func.isRequired,
  moveIsClicked: PropTypes.func.isRequired,
  folders: PropTypes.array.isRequired,
  path: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.file.action.checked.items,
  folders: state.file.action.folders,
  path: state.file.tree.path,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getFolders: (x) => dispatch(getFolders(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoveItem);
