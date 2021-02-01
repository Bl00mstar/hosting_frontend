import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { tokenConfig } from '@store/user/user.helpers';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { useStyles } from '@styles/DashboardStyle';
import {
  getUserFiles,
  setDirectoryPath,
  folderChecked,
  filesChecked,
} from '@store/files/file.actions';
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
import { Folder, InsertDriveFile, GetApp } from '@material-ui/icons';
import CreateFolder from './CreateFolder';
import UploadFile from './UploadFile';
import Rename from './Rename';
import RenameView from './RenameView';
import DeleteItem from './DeleteItem';

const Files = ({
  filesList,
  getFiles,
  foldersList,
  path,
  setPath,
  folderCheck,
  checkedFiles,
  filesChecked,
}) => {
  const [showCreateField, setShowCreateField] = useState(false);
  const [showUploadField, setShowUploadField] = useState(false);
  const [renameInput, setRenameInput] = useState(false);
  const [selectPath, setSelectPath] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    getFiles(path);
    let pathArray = path.replace(/\//g, '/ ').split(' ');
    pathArray.pop();
    setSelectPath(pathArray);
  }, [getFiles, path]);

  const downloadFiles = async (data) => {
    const { id, name } = data;
    let token = await tokenConfig();
    let link = `http://192.168.55.100:9000/media/file/${id}`;
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
            <Checkbox
              inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
              onChange={() => {
                folderCheck(value);
              }}
            />
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
              value={value.fileName}
              inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
              onChange={(e) => {
                let filtered = checkedFiles.filter(
                  (el) => el.name === e.target.value
                );
                let checkedFile = { id: value.fileId, name: e.target.value };
                if (typeof filtered !== 'undefined' && filtered.length > 0) {
                  let newFilesArray = checkedFiles.filter(
                    (el) => el.name !== e.target.value
                  );
                  filesChecked(newFilesArray);
                } else {
                  filesChecked([...checkedFiles, checkedFile]);
                }
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

  const showRenameField = () => {
    setRenameInput(!renameInput);
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
            <Rename isClicked={showRenameField} checkedValue={setRenameInput} />
            <DeleteItem />
            <br />
            {showCreateField && <CreateFolder />}
            {showUploadField && <UploadFile />}
            {renameInput && <RenameView />}
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
  folderCheck: PropTypes.func.isRequired,
  filesChecked: PropTypes.func.isRequired,
  checkedFiles: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  filesList: state.file.tree.files,
  foldersList: state.file.tree.folders,
  path: state.file.tree.path,
  checkedFiles: state.file.items.checked.files,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getFiles: (x) => dispatch(getUserFiles(x)),
    setPath: (x) => dispatch(setDirectoryPath(x)),
    folderCheck: (x) => dispatch(folderChecked(x)),
    filesChecked: (x) => dispatch(filesChecked(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Files);
