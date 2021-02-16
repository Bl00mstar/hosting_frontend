import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import {
  trashDelete,
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
  alert: {
    marginTop: '5px',
    marginLeft: '5px',
    marginRight: '5px',
  },
  button: {
    marginTop: '9px',
    marginRight: '7px',
    color: 'red',
    marginBottom: '11px',
  },
}));

const TrashDelete = ({
  checkedTrash,
  deleteFiles,
  getTrashList,
  trashStore,
}) => {
  const classes = useStyles();

  const handleDelete = () => {
    deleteFiles(checkedTrash);
    setTimeout(() => {
      getTrashList();
      trashStore([]);
    }, 300);
  };

  return (
    <Card margin="normal" className={classes.card}>
      <div className={classes.alert}>
        <Alert severity="info">Files will be deleted permanently.</Alert>
      </div>

      <Button
        className={classes.button}
        variant="outlined"
        onClick={() => handleDelete()}
        size="small"
      >
        Delete
      </Button>
    </Card>
  );
};

TrashDelete.propTypes = {
  checkedTrash: PropTypes.array.isRequired,
  deleteFiles: PropTypes.func.isRequired,
  getTrashList: PropTypes.func.isRequired,
  trashStore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  checkedTrash: state.file.trash.checked.items,
});

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFiles: (x) => dispatch(trashDelete(x)),
    getTrashList: (x) => dispatch(getUserTrash(x)),
    trashStore: (x) => dispatch(trashSelected(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrashDelete);
