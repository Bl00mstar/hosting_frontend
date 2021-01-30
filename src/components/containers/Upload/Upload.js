import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useStyles } from '@styles/DashboardStyle';
import { Typography, Grid } from '@material-ui/core';
import axios from 'axios';
import { tokenConfig } from '@store/user/user.helpers';

const Upload = ({ path }) => {
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
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className={classes.title}>
            Selected path:
            <form action="#">
              <div className="file-field input-field" id="upload-image">
                <div className="btn-small blue">
                  <span>Choose image</span>
                  <input
                    type="file"
                    onChange={(e) => {
                      setUploadedImage(e.target.files[0]);
                    }}
                  ></input>
                </div>
                <button className="btn-small blue" onClick={handleClick}>
                  Upload image
                </button>
              </div>
            </form>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

Upload.propTypes = {
  path: PropTypes.string,
};

const mapStateToProps = (state) => ({
  path: state.file.tree.path,
});

// const mapDispatchToProps = (dispatch) => {
//   return {
//     createFolder: (x) => dispatch(createNewFolder(x)),
//   };
// };

export default connect(mapStateToProps)(Upload);
