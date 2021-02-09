import { handleCheck } from '@store/files/file.actions';
import {
  List,
  ListItem,
  Checkbox,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { InsertDriveFile, GetApp, Folder } from '@material-ui/icons';

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const FilesList = ({ files, handleCheck, checkedItems }) => {
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
                // onClick={() => {
                //   setPath(path + value.name + '/');
                // }}
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
  files: PropTypes.array.isRequired,
  checkedItems: PropTypes.array.isRequired,
  handleCheck: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  files: state.file.tree.items,
  checkedItems: state.file.action.checked.items,
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleCheck: (x) => dispatch(handleCheck(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilesList);
