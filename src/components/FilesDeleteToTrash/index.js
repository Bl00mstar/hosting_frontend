import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import {
  deleteItem,
  getUserFiles,
  handleCheck,
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

const FilesDeleteToTrash = ({
  checkedItems,
  moveToTrash,
  getFiles,
  path,
  handleCheck,
}) => {
  const classes = useStyles();

  const handleMoveToTrash = () => {
    moveToTrash({ items: checkedItems, path: path });
    setTimeout(() => {
      getFiles(path);
      handleCheck([]);
    }, 100);
  };

  return (
    <Card margin="normal" className={classes.card}>
      <div className={classes.alert}>
        <Alert severity="info">
          Folders will be deleted, existed files will be moved into trash
          folder. If you want continue press confirm.
        </Alert>
      </div>

      <Button
        className={classes.button}
        variant="outlined"
        size="small"
        onClick={() => handleMoveToTrash()}
      >
        Confirm
      </Button>
    </Card>
  );
};

FilesDeleteToTrash.propTypes = {
  getFiles: PropTypes.func.isRequired,
  checkedItems: PropTypes.array.isRequired,
  moveToTrash: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  handleCheck: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  checkedItems: state.file.action.checked.items,
  path: state.file.tree.path,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getFiles: (x) => dispatch(getUserFiles(x)),
    moveToTrash: (x) => dispatch(deleteItem(x)),
    handleCheck: (x) => dispatch(handleCheck(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilesDeleteToTrash);
