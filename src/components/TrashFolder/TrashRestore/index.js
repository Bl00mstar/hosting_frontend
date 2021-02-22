import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  trashRestore,
  getUserTrash,
  trashSelected,
} from '@store/files/file.actions';

const useStyles = makeStyles(() => ({
  card: {
    justify: 'center',
    width: '95%',
    marginTop: '5px',
    textAlign: 'center',
  },

  button: {
    marginTop: '9px',
    marginRight: '7px',
    marginBottom: '11px',
  },
}));

const TrashRestore = ({ checkedTrash, restore, getTrashList, trashStore }) => {
  const classes = useStyles();

  const handleRestore = () => {
    restore(checkedTrash);
    setTimeout(() => {
      getTrashList();
      trashStore([]);
    }, 100);
  };

  return (
    <Card margin="normal" className={classes.card}>
      <Button
        className={classes.button}
        onClick={() => handleRestore()}
        variant="outlined"
        size="small"
      >
        Restore
        {checkedTrash.length > 1
          ? ' ' + checkedTrash.length + ' files'
          : ' file'}
      </Button>
    </Card>
  );
};

TrashRestore.propTypes = {
  isChecked: PropTypes.object,
  checkedTrash: PropTypes.array.isRequired,
  restore: PropTypes.func.isRequired,
  getTrashList: PropTypes.func.isRequired,
  trashStore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  checkedTrash: state.file.trash.checked.items,
});

const mapDispatchToProps = (dispatch) => {
  return {
    restore: (x) => dispatch(trashRestore(x)),
    getTrashList: (x) => dispatch(getUserTrash(x)),
    trashStore: (x) => dispatch(trashSelected(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrashRestore);
