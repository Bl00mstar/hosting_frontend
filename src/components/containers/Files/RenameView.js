import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box } from '@material-ui/core';
import { renameItem, getUserFiles } from '@store/files/file.actions';

const RenameView = ({ item, rename, path, getFiles }) => {
  const [name, setName] = useState('');
  const { handleSubmit } = useForm({
    criteriaMode: 'all',
    mode: 'onChange',
  });

  const [selectedItem, setSelectedItem] = useState({});
  const handleChange = (event) => {
    setName(event.target.value);
  };

  useEffect(() => {
    if (item.type === 'file') {
      let itemName = item.name.split('.');
      itemName.pop();
      setName(itemName);
      setSelectedItem(item);
    } else if (item.type === 'folder') {
      setName(item.name);
      setSelectedItem(item);
    }
  }, [item]);

  const onSubmit = () => {
    rename({ newName: name, item: selectedItem, path: path });
    getFiles(path);
  };

  return (
    <Box
      m={2}
      style={{ justify: 'center', maxWidth: '500px', margin: '0 auto' }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          id="rename"
          label="Name"
          value={name}
          size="small"
          onChange={handleChange}
        />
        <Box textAlign="center" m={1}>
          <Button
            size="small"
            variant="outlined"
            type="submit"
            style={{ marginBottom: '5px', justify: 'center' }}
          >
            Change
          </Button>
        </Box>
      </form>
    </Box>
  );
};

RenameView.propTypes = {
  item: PropTypes.object.isRequired,
  rename: PropTypes.func.isRequired,
  getFiles: PropTypes.func.isRequired,
  path: PropTypes.string,
};

const mapStateToProps = (state) => ({
  item: state.file.action.selected,
  path: state.file.tree.path,
});

const mapDispatchToProps = (dispatch) => {
  return {
    rename: (x) => dispatch(renameItem(x)),
    getFiles: (x) => dispatch(getUserFiles(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RenameView);
