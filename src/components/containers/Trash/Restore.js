import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { restoreItem } from '@store/files/file.actions';

const Restore = ({ checked, restore }) => {
  const [deleteButton, setDeleteButton] = useState(false);
  useEffect(() => {
    if (checked.length > 0) {
      setDeleteButton(true);
    } else {
      setDeleteButton(false);
    }
  }, [checked]);

  const handleRestore = () => {
    if (confirm('Files will be moved to root folder.')) {
      // Save it!
      console.log('Moved!');
      //files /folders /path
      restore({ items: checked });
    } else {
      // Do nothing!
      console.log('Nope');
    }
  };

  return (
    <>
      {deleteButton ? (
        <Button variant="outlined" onClick={() => handleRestore()}>
          Restore
        </Button>
      ) : (
        <></>
      )}
    </>
  );
};

Restore.propTypes = {
  checked: PropTypes.array.isRequired,
  restore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  checked: state.file.action.checked.items,
});

const mapDispatchToProps = (dispatch) => {
  return {
    restore: (x) => dispatch(restoreItem(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Restore);
