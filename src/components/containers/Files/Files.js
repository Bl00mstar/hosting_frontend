import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { tokenConfig } from '@store/user/user.helpers';
import axios from 'axios';
import download from 'downloadjs';
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
import {
  Folder,
  InsertDriveFile,
  Delete,
  GetApp,
  FormatColorText,
} from '@material-ui/icons';

const Files = ({ filesList, getFiles, foldersList, path, setPath }) => {
  const [selectPath, setSelectPath] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    getFiles(path);
    let pathArray = path.replace(/\//g, '/ ').split(' ');
    pathArray.pop();
    setSelectPath(pathArray);
  }, [getFiles, path]);

  const downloadFiles = async (data) => {
    console.log(path + data);
    let token = await tokenConfig();
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${token.headers['x-auth-token']}`;
    axios
      .post('http://localhost:9000/media/file', { file: data, path: path })
      .then((data) => {
        console.log(data);
        download(data.data, 'asd.mp3');
      })
      .catch((err) => console.log(err));
  };

  const generate = (values, type) => {
    if (values) {
      return values.map((value) =>
        React.cloneElement(
          <ListItem>
            <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
            <ListItemIcon>
              {type === 'folder' ? <Folder /> : <InsertDriveFile />}
            </ListItemIcon>

            {type === 'folder' ? (
              <ListItemText
                style={{ cursor: 'pointer' }}
                primary={value}
                onClick={() => {
                  setPath(path + value);
                }}
              />
            ) : (
              <ListItemText style={{ cursor: 'pointer' }} primary={value} />
            )}

            {type === 'file' ? (
              <ListItemIcon
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  downloadFiles(value);
                }}
              >
                <GetApp />
              </ListItemIcon>
            ) : (
              <></>
            )}
            <ListItemIcon
              style={{ cursor: 'pointer' }}
              onClick={() => {
                console.log('rename');
              }}
            >
              <FormatColorText />
            </ListItemIcon>
            <ListItemIcon
              style={{ cursor: 'pointer' }}
              onClick={() => {
                console.log('delete');
              }}
            >
              <Delete />
            </ListItemIcon>
          </ListItem>,
          {
            key: value,
          }
        )
      );
    } else {
      <div>No files</div>;
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
            <Button variant="outlined">Create folder</Button>
            <input
              className={classes.input}
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="outlined"
                component="span"
                className={classes.button}
              >
                Upload File
              </Button>
            </label>
            <Button variant="outlined">Delete</Button>
            <Button variant="outlined">Rename</Button>
            <List dense={true}>
              {foldersList ? (
                generate(foldersList, 'folder')
              ) : (
                <div>nie ma</div>
              )}
              {filesList ? generate(filesList, 'file') : <div>nie ma</div>}
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
