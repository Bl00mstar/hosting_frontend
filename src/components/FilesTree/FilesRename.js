import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  renameItem,
  getUserFiles,
  alertFiles,
} from '@store/files/file.actions';
import { TextField } from '@material-ui/core';
import Button from '@components/CustomButtons/Button.js';
import { fileFolderRegex } from '@utils/api';
import GridItem from '@components/Grid/GridItem.js';
import GridContainer from '@components/Grid/GridContainer.js';

const useStyles = makeStyles(() => ({}));

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
    <GridContainer style={{ textAlign: 'center' }}>
      <GridItem xs={12} sm={12} md={12}>
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
          style={{
            width: '150px',
            minWidth: '25%',
            marginTop: '10px',
            marginRight: '20px',
          }}
        />
        <Button
          size="sm"
          color="primary"
          style={{ maxWidth: '30%', height: '39px', marginTop: '10px' }}
          onClick={onSubmit}
        >
          Change
        </Button>
      </GridItem>
    </GridContainer>
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
