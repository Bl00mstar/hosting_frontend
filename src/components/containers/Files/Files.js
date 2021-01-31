import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { tokenConfig } from '@store/user/user.helpers';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { useStyles } from '@styles/DashboardStyle';
import { getUserFiles, setDirectoryPath } from '@store/files/file.actions';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Typography,
  Checkbox,
  Button,
} from '@material-ui/core';
import { Folder, InsertDriveFile, Delete, GetApp } from '@material-ui/icons';
import CreateFolder from './CreateFolder';
import UploadFile from './UploadFile';

const Files = ({ filesList, getFiles, foldersList, path, setPath }) => {
  const [showCreateField, setShowCreateField] = useState(false);
  const [showUploadField, setShowUploadField] = useState(false);
  const [selectPath, setSelectPath] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    getFiles(path);
    let pathArray = path.replace(/\//g, '/ ').split(' ');
    pathArray.pop();
    setSelectPath(pathArray);
  }, [getFiles, path]);

  const deleteFile = async (data) => {
    const { id } = data;
    let token = await tokenConfig();
    let link = `http://localhost:9000/media/delete/${id}`;
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${token.headers['x-auth-token']}`;
    axios({
      url: link,
      method: 'GET',
    }).then((data) => {
      console.log(data);
    });
  };

  const downloadFiles = async (data) => {
    const { id, name } = data;
    let token = await tokenConfig();
    let link = `http://localhost:9000/media/file/${id}`;
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${token.headers['x-auth-token']}`;
    axios({
      url: link,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      saveAs(response.data, name);
    });
  };

  const generateFolders = (values) => {
    if (values) {
      return values.map((value) =>
        React.cloneElement(
          <ListItem>
            <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            <ListItemText
              style={{ cursor: 'pointer' }}
              primary={value}
              onClick={() => {
                setPath(path + value);
              }}
            />
          </ListItem>,
          { key: value }
        )
      );
    }
  };
  const generateFiles = (values) => {
    if (values) {
      return values.map((value) =>
        React.cloneElement(
          <ListItem>
            <Checkbox
              value={value.fileId}
              inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
            <ListItemIcon>
              <InsertDriveFile />
            </ListItemIcon>
            <ListItemText
              style={{ cursor: 'pointer' }}
              primary={value.fileName}
            />
            <ListItemIcon
              style={{ cursor: 'pointer' }}
              onClick={() => {
                downloadFiles({ id: value.fileId, name: value.fileName });
              }}
            >
              <GetApp />
            </ListItemIcon>
            <ListItemIcon
              style={{ cursor: 'pointer' }}
              onClick={() => {
                deleteFile({ id: value.fileId });
              }}
            >
              <Delete />
            </ListItemIcon>
          </ListItem>,
          { key: value.fileId }
        )
      );
    }
  };

  const selectDirectory = (e, el) => {
    e.preventDefault();
    setPath(path.split(el)[0] + el);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={10}>
          <Typography variant="h6" className={classes.title}>
            Path:{' '}
            {selectPath.map((el, key) => (
              <Button
                variant="outlined"
                onClick={(e) => selectDirectory(e, el)}
                key={key}
              >
                {el}
              </Button>
            ))}
          </Typography>
          <div className={classes.demo}>
            <Button
              variant="outlined"
              onClick={() => {
                setShowCreateField(!showCreateField);
              }}
            >
              Create folder
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setShowUploadField(!showUploadField);
              }}
            >
              Upload File
            </Button>
            {/* <Button variant="outlined">Delete</Button>
            <Button variant="outlined">Rename</Button> */}
            {showCreateField && <CreateFolder />}
            {showUploadField && <UploadFile />}
            <List dense={true}>
              {foldersList ? generateFolders(foldersList) : <></>}
              {filesList ? generateFiles(filesList) : <></>}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

Files.propTypes = {
  getFiles: PropTypes.func,
  setPath: PropTypes.func,
  filesList: PropTypes.array.isRequired,
  foldersList: PropTypes.array,
  path: PropTypes.string,
};

const mapStateToProps = (state) => ({
  filesList: state.file.tree.files,
  foldersList: state.file.tree.folders,
  path: state.file.tree.path,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getFiles: (x) => dispatch(getUserFiles(x)),
    setPath: (x) => dispatch(setDirectoryPath(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Files);
