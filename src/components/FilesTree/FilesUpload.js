import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import GridItem from '@components/Grid/GridItem.js';
import GridContainer from '@components/Grid/GridContainer.js';
import Button from '@components/CustomButtons/Button.js';
import { TextField, LinearProgress, Typography } from '@material-ui/core';
import { tokenConfig } from '@store/user/user.helpers';
import { getUserFiles, alertFiles } from '@store/files/file.actions';

const UploadFile = ({ alertFiles, path, getFiles, itemsList, filters }) => {
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
              getFiles({ path: path, filters: filters });
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
    <GridContainer style={{ textAlign: 'center' }}>
      <GridItem xs={12} sm={12} md={12}>
        <TextField
          id="file"
          type="file"
          margin="normal"
          size="small"
          name="selectedFile"
          variant="outlined"
          color="primary"
          style={{
            width: '150px',
            minWidth: '25%',
            marginTop: '10px',
            marginRight: '20px',
          }}
          onChange={(e) => {
            setUploadedImage(e.target.files[0]);
          }}
        />
        <Button
          size="sm"
          color="primary"
          style={{ maxWidth: '30%', height: '39px', marginTop: '10px' }}
          onClick={handleClick}
        >
          Upload
        </Button>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        {uploadPercentage !== 0 && (
          <div>
            <LinearProgress
              style={{
                marginLeft: '50px',
                marginRight: '50px',
                justify: 'center',
                alignItems: 'center',
              }}
              variant="determinate"
              value={uploadPercentage}
            />
            <Typography variant="body2" color="textSecondary">
              {uploadPercentage}
            </Typography>
          </div>
        )}
      </GridItem>
    </GridContainer>
  );
};

UploadFile.propTypes = {
  path: PropTypes.string,
  alertFiles: PropTypes.func.isRequired,
  getFiles: PropTypes.func.isRequired,
  itemsList: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  path: state.file.tree.path,
  itemsList: state.file.tree.items,
  filters: state.file.tree.filters,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getFiles: (x) => dispatch(getUserFiles(x)),
    alertFiles: (x) => dispatch(alertFiles(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadFile);
