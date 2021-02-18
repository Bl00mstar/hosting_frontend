import { handleCheck } from '@store/files/file.actions';
import {
  List,
  ListItem,
  Checkbox,
  ListItemIcon,
  Divider,
  ListItemText,
} from '@material-ui/core';
import { InsertDriveFile, GetApp, Folder } from '@material-ui/icons';
import { setDirectoryPath, foldersPath } from '@store/files/file.actions';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const FilesList = ({ path, files, handleCheck, checkedItems, getFiles }) => {
  const [isChecked, setIsChecked] = useState({ values: [] });

  useEffect(() => {
    if (checkedItems.length === 0 && isChecked.values.length > 0) {
      setIsChecked({
        values: [],
      });
    }
  }, [checkedItems]);

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

  const handleCheckElement = (value) => {
    if (isChecked.values.includes(value.id)) {
      let filtered = isChecked.values.filter((el) => el !== value.id);
      setIsChecked({
        values: filtered,
      });
    } else {
      setIsChecked((isChecked) => ({
        ...isChecked,
        values: [...isChecked.values, value.id],
      }));
    }
  };

  const generate = (values) => {
    if (values) {
      return values.map((value) =>
        React.cloneElement(
          <>
            <Divider />
            <ListItem width={'200px'}>
              <Checkbox
                value={value.name}
                checked={isChecked.values.includes(value.id) ? true : false}
                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                onChange={(e) => {
                  handleCheckElement(value);
                  handleCheckbox(e, value);
                }}
              />
              <ListItemIcon>
                {value.type === 'folder' ? <Folder /> : <InsertDriveFile />}
              </ListItemIcon>

              {value.type === 'folder' ? (
                <ListItemText
                  style={{
                    cursor: 'pointer',
                    overflow: 'hidden',
                    width: 'left',
                  }}
                  primary={value.name}
                  onClick={() => {
                    getFiles(path + value.name + '/');
                  }}
                />
              ) : (
                <ListItemText
                  style={{
                    cursor: 'pointer',
                    overflow: 'hidden',
                  }}
                  primary={value.name}
                />
              )}
              <ListItemText
                style={{ cursor: 'pointer' }}
                primary={value.date}
              />
              {value.type === 'file' && (
                <ListItemIcon
                  style={{ cursor: 'pointer' }}
                  // onClick={() => {
                  //   download({ id: value.id, name: value.name });
                  // }}
                >
                  <GetApp />
                </ListItemIcon>
              )}
            </ListItem>
          </>,
          { key: value.id }
        )
      );
    }
  };

  return (
    <List
      size="small"
      style={{
        display: 'inline-block',
        // position: 'fixed',
        // minWidth: '70%',
        // maxHeight: '55%',
        overflow: 'auto',
        position: 'absolute',
        bottom: '30px',
        width: '1600px',
        maxWidth: '90%',
        height: '1600px',
        maxHeight: '65%',
      }}
      dense={true}
      fullWidth
    >
      {files.length > 0 ? (
        generate(files)
      ) : (
        <ListItem width={'100px'}>
          <ListItemText primary={'Folder is empty.'} />
        </ListItem>
      )}
    </List>
  );
};

FilesList.propTypes = {
  getFiles: PropTypes.func.isRequired,
  setPath: PropTypes.func.isRequired,
  files: PropTypes.array.isRequired,
  checkedItems: PropTypes.array.isRequired,
  handleCheck: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  path: state.file.tree.path,
  files: state.file.tree.items,
  checkedItems: state.file.action.checked.items,
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleCheck: (x) => dispatch(handleCheck(x)),
    getFiles: (x) => dispatch(setDirectoryPath(x)),
    setPath: (x) => dispatch(foldersPath(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilesList);
