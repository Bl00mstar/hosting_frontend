import { handleCheck } from '@store/files/file.actions';
import {
  List,
  ListItem,
  Checkbox,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { InsertDriveFile, GetApp, Folder } from '@material-ui/icons';
import { setDirectoryPath, foldersPath } from '@store/files/file.actions';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const FilesList = ({
  path,
  files,
  handleCheck,
  checkedItems,
  getFiles,
  setPath,
}) => {
  const [isChecked, setIsChecked] = useState({ values: [] });

  useEffect(() => {
    if (checkedItems.length === 0) {
      console.log('clear');
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
    console.log('asd');
    setIsChecked((isChecked) => ({
      ...isChecked,
      values: [...isChecked.values, value.id],
    }));
    console.log(isChecked);
  };

  const generate = (values) => {
    if (values) {
      return values.map((value) =>
        React.cloneElement(
          <ListItem width={'100px'}>
            <Checkbox
              value={value.name}
              // checked={isChecked.values.includes(value.id) ? true : false}
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
                style={{ cursor: 'pointer' }}
                primary={value.name}
                onClick={() => {
                  setPath(path + value.name + '/');
                  getFiles(path + value.name + '/');
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
                // onClick={() => {
                //   download({ id: value.id, name: value.name });
                // }}
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

  return (
    <List
      size="small"
      style={{
        display: 'inline-block',
        position: 'fixed',
        minWidth: '70%',
        maxHeight: '55%',
        overflow: 'auto',
      }}
      dense={true}
    >
      {files ? generate(files) : <></>}
      <div></div>
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
  path: state.file.action.path,
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
