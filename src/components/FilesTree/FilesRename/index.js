import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  renameItem,
  getUserFiles,
  alertFiles,
} from '@store/files/file.actions';
import { TextField, Button, Card } from '@material-ui/core';
import { fileFolderRegex } from '@utils/api';

const useStyles = makeStyles(() => ({
  input: {
    marginTop: '5px',
    marginBottom: '5px',
    marginLeft: '7px',
    width: '300px',
    maxWidth: '60%',
  },
  button: {
    marginTop: '9px',
    marginRight: '7px',
    float: 'right',
  },
}));

const FilesRename = ({
  item,
  alertFiles,
  itemsList,
  path,
  rename,
  getFiles,
  filters,
}) => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [defaultName, setDefaultName] = useState({ name: '', ext: '' });

  const handleChange = (event) => {
    setName(event.target.value);
  };

  useEffect(() => {
    if (item.type === 'file') {
      let itemName = item.name.split('.');
      let extension = itemName.pop();
      setName(itemName);
      setDefaultName({ name: item.name, ext: extension });
    } else if (item.type === 'folder') {
      setName(item.name);
      setDefaultName(item.name);
    }
  }, [item]);

  const onSubmit = () => {
    if (!name) {
      alertFiles({ message: 'Folder name cannot be empty.', type: 'info' });
    } else if (!fileFolderRegex.test(name)) {
      alertFiles({
        message: 'Invalid name.',
        type: 'info',
      });
    } else {
      if (item.type === 'file') {
        let filtered = itemsList.filter(
          (el) => el.name === name[0] + '.' + defaultName.ext
        );
        if (typeof filtered !== 'undefined' && filtered.length > 0) {
          alertFiles({
            message: 'File name is taken.',
            type: 'info',
          });
        } else {
          rename({ newName: name, item: item, path: path });
          setName('');
          setTimeout(() => {
            getFiles({ path: path, filters: filters });
          }, 500);
        }
      } else if (item.type === 'folder') {
        let filtered = itemsList.filter((el) => el.name === name);
        if (typeof filtered !== 'undefined' && filtered.length > 0) {
          alertFiles({
            message: 'Folder name is taken.',
            type: 'info',
          });
        } else {
          rename({ newName: name, item: item, path: path });
          setName('');
          setTimeout(() => {
            getFiles(path);
          }, 500);
        }
      }
    }
  };

  return (
    <Card margin="normal" style={{ width: '95%', marginTop: '5px' }}>
      <TextField
        className={classes.input}
        id="outlined-email-input"
        label={'Rename '}
        type="text"
        size="small"
        name="name"
        value={name}
        autoComplete="name"
        variant="outlined"
        color="primary"
        onChange={handleChange}
      />

      <Button
        className={classes.button}
        onClick={onSubmit}
        variant="contained"
        size="small"
      >
        Change
      </Button>
    </Card>
  );
};

FilesRename.propTypes = {
  item: PropTypes.object.isRequired,
  rename: PropTypes.func.isRequired,
  getFiles: PropTypes.func.isRequired,
  path: PropTypes.string,
  alertFiles: PropTypes.func.isRequired,
  itemsList: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.file.action.selected,
  path: state.file.tree.path,
  itemsList: state.file.tree.items,
  filters: state.file.tree.filters,
});

const mapDispatchToProps = (dispatch) => {
  return {
    rename: (x) => dispatch(renameItem(x)),
    getFiles: (x) => dispatch(getUserFiles(x)),
    alertFiles: (x) => dispatch(alertFiles(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilesRename);
