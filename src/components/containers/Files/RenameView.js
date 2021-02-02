import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@material-ui/core';
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
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="standard-name"
          label="Name"
          value={name}
          onChange={handleChange}
        />
        <Button type="submit" name="asd" variant="outlined">
          Change
        </Button>
      </form>
    </section>
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
