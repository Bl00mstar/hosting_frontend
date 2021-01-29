import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserFiles, setDirectoryPath } from '@store/files/file.actions';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import Delete from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import FormatColorTextIcon from '@material-ui/icons/FormatColorText';
import GetAppIcon from '@material-ui/icons/GetApp';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

const Files = ({ filesList, getFiles, foldersList, path, setPath }) => {
  const [selectPath, setSelectPath] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    getFiles(path);
    let pathArray = path.replace(/\//g, '/ ').split(' ');
    pathArray.pop();
    setSelectPath(pathArray);
  }, [getFiles, path]);

  const generate = (values, type) => {
    if (values) {
      return values.map((value) =>
        React.cloneElement(
          <ListItem>
            <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
            <ListItemIcon>
              {type === 'folder' ? <FolderIcon /> : <InsertDriveFileIcon />}
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
                  console.log('download');
                }}
              >
                <GetAppIcon />
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
              <FormatColorTextIcon />
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
            <Button variant="outlined">Upload file</Button>
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
