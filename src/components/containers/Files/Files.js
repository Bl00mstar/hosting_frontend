import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useStyles } from '@styles/DashboardStyle';
import {
  getUserFiles,
  setDirectoryPath,
  downloadItem,
  handleCheck,
} from '@store/files/file.actions';
import {
  Grid,
  Typography,
  List,
  ListItem,
  Checkbox,
  ListItemIcon,
  ListItemText,
  Button,
  Box,
} from '@material-ui/core';
import { InsertDriveFile, GetApp, Folder } from '@material-ui/icons';
import CreateFolder from './CreateFolder';
import UploadFile from './UploadFile';
import Rename from './Rename';
import MoveItem from './MoveItem';
import DeleteItem from './DeleteItem';
import RenameView from './RenameView';
import FileAlerts from './FileAlerts';
import MoveView from './MoveView';

const Files = ({
  itemsList,
  path,
  getFiles,
  downloadItem,
  checkedItems,
  handleCheck,
  setPath,
}) => {
  const classes = useStyles();
  const [showMoveField, setShowMoveField] = useState(false);
  const [showCreateField, setShowCreateField] = useState(false);
  const [showUploadField, setShowUploadField] = useState(false);
  const [renameInput, setRenameInput] = useState(false);
  const [selectPath, setSelectPath] = useState([]);

  useEffect(() => {
    getFiles(path);
    let pathArray = path.replace(/\//g, '/ ').split(' ');
    pathArray.pop();
    setSelectPath(pathArray);
  }, [getFiles, path]);

  useEffect(() => {
    handleCheck([]);
  }, [handleCheck]);

  const handleCheckbox = (e, data) => {
    let filtered = checkedItems.filter((el) => el.name === e.target.value);
    let newChecked = { id: data.id, name: data.name, type: data.type };
    if (typeof filtered !== 'undefined' && filtered.length > 0) {
      let newFilesArray = checkedItems.filter(
        (el) => el.name !== e.target.value
      );
      handleCheck(newFilesArray);
    } else {
      handleCheck([...checkedItems, newChecked]);
    }
  };

  const generate = (values) => {
    if (values) {
      return values.map((value) =>
        React.cloneElement(
          <ListItem width={'100px'}>
            <Checkbox
              value={value.name}
              inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
              onChange={(e) => {
                handleCheckbox(e, value);
              }}
            />
            <ListItemIcon>
              {value.type === 'folder' ? <Folder /> : <InsertDriveFile />}
            </ListItemIcon>
            {value.type === 'folder' ? (
              <ListItemText
                style={{ cursor: 'pointer' }}
                primary={value.name}
                onClick={() => {
                  setPath(path + value.name + '/');
                }}
              />
            ) : (
              <ListItemText
                style={{ cursor: 'pointer' }}
                primary={value.name}
              />
            )}
            {value.type === 'file' && (
              <ListItemIcon
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  downloadItem({ id: value.id, name: value.name });
                }}
              >
                <GetApp />
              </ListItemIcon>
            )}
          </ListItem>,
          { key: value.id }
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

  const handleMoveField = () => {
    setShowMoveField(!showMoveField);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={10}>
          <Typography variant="h6" className={classes.title}>
            <FileAlerts />
            {selectPath.map((el, key) => (
              <Button
                variant="outlined"
                size="small"
                onClick={(e) => selectDirectory(e, el)}
                key={key}
              >
                {el}
              </Button>
            ))}

            <div className={classes.demo}>
              <Button
                variant="outlined"
                style={{ marginRight: '5px', marginTop: '5px' }}
                onClick={() => {
                  setShowCreateField(!showCreateField);
                }}
              >
                Create folder
              </Button>
              <Button
                variant="outlined"
                style={{ marginRight: '5px', marginTop: '5px' }}
                margin="normal"
                onClick={() => {
                  setShowUploadField(!showUploadField);
                }}
              >
                Upload File
              </Button>
              <Rename
                renameIsClicked={showRenameField}
                checkedValue={setRenameInput}
              />
              <MoveItem moveIsClicked={handleMoveField} />
              <DeleteItem />
              <br />
              {showCreateField && <CreateFolder />}
              {showUploadField && <UploadFile />}
              {renameInput && <RenameView />}
              {showMoveField && <MoveView />}
              <Box m={2}>
                <List
                  size="small"
                  style={{
                    display: 'inline-block',
                    position: 'fixed',
                    minWidth: '70%',
                    maxHeight: '70%',
                    overflow: 'auto',
                  }}
                  dense={true}
                >
                  {itemsList ? generate(itemsList) : <></>}
                </List>
              </Box>
            </div>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

Files.propTypes = {
  itemsList: PropTypes.array.isRequired,
  getFiles: PropTypes.func.isRequired,
  setPath: PropTypes.func.isRequired,
  downloadItem: PropTypes.func.isRequired,
  checkedItems: PropTypes.array.isRequired,
  handleCheck: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  itemsList: state.file.tree.items,
  path: state.file.tree.path,
  checkedItems: state.file.action.checked.items,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getFiles: (x) => dispatch(getUserFiles(x)),
    setPath: (x) => dispatch(setDirectoryPath(x)),
    downloadItem: (x) => dispatch(downloadItem(x)),
    handleCheck: (x) => dispatch(handleCheck(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Files);
