import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { trashSelected } from '@store/files/file.actions';
import {
  List,
  ListItemText,
  ListItemIcon,
  ListItem,
  Checkbox,
} from '@material-ui/core';
import { InsertDriveFile } from '@material-ui/icons';
import {
  setDirectoryPath,
  foldersPath,
  getUserTrash,
} from '@store/files/file.actions';

const TrashList = ({ checkedTrash, trashItems, handleCheckStore }) => {
  const handleCheckElement = (value) => {
    let filtered = checkedTrash.filter((el) => el.name === value.name);
    if (typeof filtered !== 'undefined' && filtered.length > 0) {
      let newFilesArray = checkedTrash.filter((el) => el.name !== value.name);
      handleCheckStore(newFilesArray);
    } else {
      handleCheckStore([...checkedTrash, value]);
    }
  };

  const generate = (values) => {
    if (values) {
      return values.map((value) =>
        React.cloneElement(
          <ListItem width={'100px'}>
            <Checkbox
              value={value.name}
              checked={checkedTrash.includes(value) ? true : false}
              inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
              onChange={() => {
                handleCheckElement(value);
              }}
            />

            <ListItemIcon>
              <InsertDriveFile />
            </ListItemIcon>
            <ListItemText primary={value.name} />
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
      {trashItems.length > 0 ? (
        generate(trashItems)
      ) : (
        <ListItem width={'100px'}>
          <ListItemText primary={'Trash folder is empty.'} />
        </ListItem>
      )}
    </List>
  );
};

TrashList.propTypes = {
  handleCheckStore: PropTypes.func.isRequired,
  getTrashList: PropTypes.func.isRequired,
  trashItems: PropTypes.array.isRequired,
  checkedTrash: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  trashItems: state.file.trash.items,
  checkedTrash: state.file.trash.checked.items,
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleCheckStore: (x) => dispatch(trashSelected(x)),
    getFiles: (x) => dispatch(setDirectoryPath(x)),
    setPath: (x) => dispatch(foldersPath(x)),
    getTrashList: (x) => dispatch(getUserTrash(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrashList);
