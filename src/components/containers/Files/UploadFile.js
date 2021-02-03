import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { Box, Typography, LinearProgress } from '@material-ui/core';
import { useStyles } from '@styles/DashboardStyle';
import { tokenConfig } from '@store/user/user.helpers';

const UploadFile = ({ path }) => {
  const classes = useStyles();
  const [uploadedImage, setUploadedImage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const options = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      let percent = Math.floor((loaded * 100) / total);
      if (percent < 100) {
        setUploadPercentage(percent);
      }
    },
  };

  const handleClick = async (e) => {
    e.preventDefault();
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
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.demo}>
      <input
        type="file"
        onChange={(e) => {
          setUploadedImage(e.target.files[0]);
        }}
      ></input>
      <button className="btn-small blue" onClick={handleClick}>
        Upload image
      </button>
      {uploadPercentage !== 0 && (
        <Box display="flex" alignItems="center">
          <Box width="100%" mr={1}>
            <LinearProgress variant="determinate" value={uploadPercentage} />
          </Box>
          <Box minWidth={35}>
            <Typography variant="body2" color="textSecondary">
              {uploadPercentage}
            </Typography>
          </Box>
        </Box>
      )}
    </div>
  );
};
UploadFile.propTypes = {
  path: PropTypes.string,
};

const mapStateToProps = (state) => ({
  path: state.file.tree.path,
});

export default connect(mapStateToProps)(UploadFile);
