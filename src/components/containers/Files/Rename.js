import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { itemSelected } from '@store/files/file.actions';

const Rename = ({ files, folders, isClicked, checkedValue, selected }) => {
  const [renameButton, setRenameButton] = useState(false);
  useEffect(() => {
    checkedValue(false);
    selected({ type: '', item: '' });
    if (files.length + folders.length === 1) {
      setRenameButton(true);
      if (files[0]) {
        selected({ type: 'file', item: files[0] });
      } else if (folders[0]) {
        selected({ type: 'folder', item: folders[0] });
      }
    } else {
      setRenameButton(false);
    }
  }, [files, folders, checkedValue, selected]);

  return (
    <>
      {renameButton ? (
        <Button variant="outlined" onClick={isClicked}>
          Rename
        </Button>
      ) : (
        <></>
      )}
    </>
  );
};

Rename.propTypes = {
  files: PropTypes.array.isRequired,
  folders: PropTypes.array.isRequired,
  isClicked: PropTypes.func.isRequired,
  checkedValue: PropTypes.func.isRequired,
  selected: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  files: state.file.items.checked.files,
  folders: state.file.items.checked.folders,
});

const mapDispatchToProps = (dispatch) => {
  return {
    selected: (x) => dispatch(itemSelected(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rename);
