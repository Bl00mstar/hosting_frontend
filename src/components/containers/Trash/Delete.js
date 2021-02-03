import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { permDelete } from '@store/files/file.actions';

const Delete = ({ checked, perm }) => {
  const [deleteButton, setDeleteButton] = useState(false);
  useEffect(() => {
    if (checked.length > 0) {
      setDeleteButton(true);
    } else {
      setDeleteButton(false);
    }
  }, [checked]);

  const handleDelete = () => {
    if (confirm('Are you sure? Files will be removed.')) {
      // Save it!
      console.log('Delete!');
      //files /folders /path
      perm({ items: checked });
    } else {
      // Do nothing!
      console.log('Nope');
    }
  };

  return (
    <>
      {deleteButton ? (
        <Button variant="outlined" onClick={() => handleDelete()}>
          Delete
        </Button>
      ) : (
        <></>
      )}
    </>
  );
};

Delete.propTypes = {
  checked: PropTypes.array.isRequired,
  perm: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  checked: state.file.action.checked.items,
});

const mapDispatchToProps = (dispatch) => {
  return {
    perm: (x) => dispatch(permDelete(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Delete);
