import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { handleSelected } from '@store/files/file.actions';

const Rename = ({ item, renameIsClicked, checkedValue, selected }) => {
  const [renameButton, setRenameButton] = useState(false);
  useEffect(() => {
    checkedValue(false);
    selected({ type: '', name: '', id: '' });
    if (item.length === 1) {
      console.log(item);
      setRenameButton(true);
      selected({ type: item[0].type, name: item[0].name, id: item[0].id });
    } else {
      setRenameButton(false);
    }
  }, [item, selected, checkedValue]);

  return (
    <>
      {renameButton ? (
        <Button variant="outlined" onClick={renameIsClicked}>
          Rename
        </Button>
      ) : (
        <></>
      )}
    </>
  );
};

Rename.propTypes = {
  item: PropTypes.array.isRequired,
  renameIsClicked: PropTypes.func.isRequired,
  checkedValue: PropTypes.func.isRequired,
  selected: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.file.action.checked.items,
});

const mapDispatchToProps = (dispatch) => {
  return {
    selected: (x) => dispatch(handleSelected(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rename);
