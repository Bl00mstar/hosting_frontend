import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Card, Button } from '@material-ui/core';
import {
  createNewFolder,
  getUserFiles,
  alertFiles,
} from '@store/files/file.actions';
import { fileFolderRegex } from '@utils/api';

const useStyles = makeStyles(() => ({
  input: {
    marginTop: '5px',
    marginBottom: '5px',
    marginLeft: '7px',
    width: '300px',
    maxWidth: '60%',
  },
  button: {
    marginTop: '9px',
    marginRight: '7px',
    float: 'right',
  },
}));

const CreateFolder = ({ alertFiles, createFolder, path, getFiles }) => {
  const classes = useStyles();
  const [folderName, setFolderName] = useState({ name: '' });

  const handleCreateFolder = () => {
    const { name } = folderName;
    if (!name) {
      alertFiles({ message: 'Folder name cannot be empty.', type: 'info' });
    } else if (!fileFolderRegex.test(name)) {
      alertFiles({
        message: 'Invalid name. Available "a-z A-Z 0-9 ! _ ".',
        type: 'info',
      });
    } else {
      createFolder({ file_type: 'new', file_text: name, file_path: path });
      setFolderName({ name: '' });
      setTimeout(() => {
        getFiles(path);
      }, 500);
    }
  };

  const handleChangeFolderInput = (e) => {
    setFolderName({ name: e.target.value });
  };

  return (
    <Card margin="normal" style={{ width: '95%', marginTop: '5px' }}>
      <TextField
        className={classes.input}
        id="outlined-email-input"
        label="New folder name"
        type="text"
        size="small"
        name="name"
        value={folderName.name}
        onChange={(e) => handleChangeFolderInput(e)}
        autoComplete="name"
        variant="outlined"
        color="primary"
      />
      <Button
        className={classes.button}
        variant="contained"
        onClick={() => handleCreateFolder()}
        size="small"
      >
        Create folder
      </Button>
    </Card>
  );
};

CreateFolder.propTypes = {
  createFolder: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  getFiles: PropTypes.func.isRequired,
  alertFiles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  path: state.file.tree.path,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getFiles: (x) => dispatch(getUserFiles(x)),
    createFolder: (x) => dispatch(createNewFolder(x)),
    alertFiles: (x) => dispatch(alertFiles(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateFolder);
