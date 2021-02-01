import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  createNewFolder,
  getUserFiles,
  clearFolderAlerts,
} from '@store/files/file.actions';
import { useStyles } from '@styles/DashboardStyle';

const CreateFolder = ({
  path,
  createFolder,
  getFiles,
  clearAlerts,
  success,
  error,
}) => {
  const classes = useStyles();
  const [showAlerts, setShowAlerts] = useState(false);
  const { register, handleSubmit } = useForm({
    criteriaMode: 'all',
    mode: 'onChange',
  });

  useEffect(() => {
    if (error || success) {
      console.log(error);
      setShowAlerts(true);
      setTimeout(() => {
        clearAlerts();
        setShowAlerts(false);
      }, 3000);
    }
  }, [error, clearAlerts, success]);

  const onSubmit = (data, e) => {
    e.preventDefault();
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
      <div>
        <br />
      </div>
      {showAlerts ? (
        <div>
          {error && <div>{error}</div>}
          {success && <div>{success}</div>}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

CreateFolder.propTypes = {
  createFolder: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  getFiles: PropTypes.func.isRequired,
  success: PropTypes.string,
  error: PropTypes.string,
  clearAlerts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  path: state.file.tree.path,
  success: state.file.alert.folder.successMsg,
  error: state.file.alert.folder.errorMsg,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getFiles: (x) => dispatch(getUserFiles(x)),
    createFolder: (x) => dispatch(createNewFolder(x)),
    clearAlerts: () => dispatch(clearFolderAlerts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateFolder);
