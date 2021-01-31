import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
// import { Button } from '@material-ui/core';
import { useStyles } from '@styles/DashboardStyle';
import { tokenConfig } from '@store/user/user.helpers';

const UploadFile = ({ path }) => {
  const classes = useStyles();
  const [uploadedImage, setUploadedImage] = useState('');

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
      .post('http://localhost:9000/media', formData)
      .then((response) => {
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
