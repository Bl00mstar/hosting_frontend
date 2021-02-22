import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
// import Card from '@components/FilesTree/Card';
import Button from '@components/CustomButtons/Button.js';
import GridItem from '@components/Grid/GridItem.js';
import GridContainer from '@components/Grid/GridContainer.js';
import {
  createNewFolder,
  getUserFiles,
  alertFiles,
} from '@store/files/file.actions';
import { fileFolderRegex } from '@utils/api';

const useStyles = makeStyles(() => ({}));

const CreateFolder = ({
  alertFiles,
  createFolder,
  path,
  getFiles,
  filters,
}) => {
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
        getFiles({ path: path, filters: filters });
      }, 100);
    }
  };

  const handleChangeFolderInput = (e) => {
    setFolderName({ name: e.target.value });
  };

  return (
    <GridContainer style={{ textAlign: 'center' }}>
      <GridItem xs={12} sm={12} md={12}>
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
          style={{
            width: '150px',
            minWidth: '25%',
            marginTop: '10px',
            marginRight: '20px',
          }}
        />

        <Button
          size="sm"
          color="primary"
          style={{ maxWidth: '30%', height: '39px', marginTop: '10px' }}
          onClick={() => handleCreateFolder()}
        >
          Create folder
        </Button>
      </GridItem>
    </GridContainer>
  );
};

CreateFolder.propTypes = {
  createFolder: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  getFiles: PropTypes.func.isRequired,
  alertFiles: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  path: state.file.tree.path,
  filters: state.file.tree.filters,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getFiles: (x) => dispatch(getUserFiles(x)),
    createFolder: (x) => dispatch(createNewFolder(x)),
    alertFiles: (x) => dispatch(alertFiles(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateFolder);
