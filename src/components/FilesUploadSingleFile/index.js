import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  Card,
  TextField,
  Button,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import { tokenConfig } from '@store/user/user.helpers';
import { getUserFiles, alertFiles } from '@store/files/file.actions';

const UploadFile = ({ alertFiles, path, getFiles, itemsList }) => {
  const [uploadedImage, setUploadedImage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const options = {
    onUploadProgress: (progressEvent) => {
      console.log(uploadPercentage);
      const { loaded, total } = progressEvent;
      let percent = Math.floor((loaded * 100) / total);
      if (percent < 100) {
        setUploadPercentage(percent);
      }
    },
  };

  const handleClick = async () => {
    if (!uploadedImage.name) {
      alertFiles({ message: 'Please choose uploaded file.', type: 'info' });
    } else {
      let filtered = itemsList.filter((el) => el.name === uploadedImage.name);
      if (typeof filtered !== 'undefined' && filtered.length > 0) {
        alertFiles({
          message: 'File already exist in this directory.',
          type: 'info',
        });
      } else {
        let token = await tokenConfig();
        let formData = new FormData();
        formData.append('file', uploadedImage);
        formData.append('userPath', path);
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${token.headers['x-auth-token']}`;
        axios.defaults.headers.common['Content-Type'] = `multipart/form-data`;
        axios
          .post('http://192.168.55.100:9000/media', formData, options)
          .then((response) => {
            setUploadPercentage(100);
            setTimeout(() => {
              setUploadPercentage(0);
            }, 1000);
            console.log(response);
          })
          .then(() => {
            setTimeout(() => {
              getFiles(path);
            }, 500);
            alertFiles({
              message: uploadedImage.name + ' was uploaded.',
              type: 'success',
            });
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <Card margin="normal" style={{ width: '95%', marginTop: '5px' }}>
      <TextField
        id="file"
        type="file"
        margin="normal"
        size="small"
        name="selectedFile"
        variant="outlined"
        color="primary"
        style={{
          marginTop: '5px',
          marginBottom: '5px',
          marginLeft: '7px',
          width: '300px',
          maxWidth: '60%',
        }}
        onChange={(e) => {
          setUploadedImage(e.target.files[0]);
        }}
      />
      <Button
        variant="contained"
        size="small"
        onClick={handleClick}
        style={{ marginTop: '9px', marginRight: '7px', float: 'right' }}
      >
        Upload
      </Button>
      {uploadPercentage !== 0 && (
        <div>
          <LinearProgress variant="determinate" value={uploadPercentage} />
          <Typography variant="body2" color="textSecondary">
            {uploadPercentage}
          </Typography>
        </div>
      )}
    </Card>
  );
};

UploadFile.propTypes = {
  path: PropTypes.string,
  alertFiles: PropTypes.func.isRequired,
  getFiles: PropTypes.func.isRequired,
  itemsList: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  path: state.file.tree.path,
  itemsList: state.file.tree.items,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getFiles: (x) => dispatch(getUserFiles(x)),
    alertFiles: (x) => dispatch(alertFiles(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadFile);
