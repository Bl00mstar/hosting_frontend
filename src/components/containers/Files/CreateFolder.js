import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextField, Button, Grid, Box } from '@material-ui/core';
import {
  createNewFolder,
  getUserFiles,
  alertFiles,
} from '@store/files/file.actions';

const CreateFolder = ({ alertFiles, createFolder, path, getFiles }) => {
  const formEl = React.useRef(null);
  const submitForm = (e) => {
    e.preventDefault();
    const formData = new FormData(formEl.current);
    const name = formData.get('name');
    console.log(name);
    if (!name) {
      alertFiles({ message: 'Folder name cannot be empty.', type: 'info' });
    } else {
      createFolder({ file_type: 'new', file_text: name, file_path: path });
      setTimeout(() => {
        getFiles(path);
      }, 500);
    }
  };

  return (
    <Box m={2}>
      <Grid
        component="form"
        ref={formEl}
        onSubmit={submitForm}
        container
        required
        justify="center"
        style={{ width: '90%', maxWidth: '500px', margin: '0 auto' }}
      >
        <TextField
          id="outlined-email-input"
          label="Folder name"
          type="text"
          size="small"
          name="name"
          autoComplete="name"
          margin="normal"
          variant="outlined"
          fullWidth
          color="primary"
        />
        <br />
        <Button
          variant="outlined"
          size="small"
          onClick={submitForm}
          type="submit"
          style={{ marginBottom: '5px' }}
        >
          Create
        </Button>
      </Grid>
    </Box>
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
