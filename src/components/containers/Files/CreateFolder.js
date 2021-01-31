import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { createNewFolder } from '@store/files/file.actions';
import { getUserFiles } from '@store/files/file.actions';
import { useStyles } from '@styles/DashboardStyle';

const CreateFolder = ({ path, createFolder, getFiles }) => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm({
    criteriaMode: 'all',
    mode: 'onChange',
  });

  const onSubmit = (data, e) => {
    e.target.reset();
    data.file_path = path;
    data.file_type = 'new';
    createFolder(data);
    getFiles(path);
  };

  return (
    <div className={classes.demo}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Folder name"
          name="file_text"
          ref={register({
            required: true,
          })}
          style={{
            marginTop: '8px',
            padding: '10px 26px 1px 12px',
            marginRight: '8px',
          }}
        />
        <button>Create</button>
      </form>
    </div>
  );
};

CreateFolder.propTypes = {
  createFolder: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  getFiles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  path: state.file.tree.path,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getFiles: (x) => dispatch(getUserFiles(x)),
    createFolder: (x) => dispatch(createNewFolder(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateFolder);
