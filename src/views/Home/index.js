import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import homeImage from '@assets/homeImage.svg';
import styles from '@assets/js/components/home/homeStyle.js';

const useStyles = makeStyles(styles);
const Home = ({ isAuthenticated }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate('/user/dashboard');
  }

  return (
    <>
      <Grid container justify="center">
        <Grid className={classes.homeGridItem} xs={12} sm={12} md={10} lg={8}>
          <Grid
            container
            className={classes.mainContainer}
            direction="row-reverse"
          >
            <Grid className={classes.homeGridItem} xs={12} sm={12} md={6}>
              <img className={classes.homeImage} src={homeImage} />
            </Grid>
            <Grid className={classes.homeGridItem} xs={12} sm={12} md={6}>
              <h1 className={classes.homeText}>
                Upload, share and manage your files.
              </h1>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container className={classes.secondContainer}>
        <Grid className={classes.homeGridItem} xs={12} sm={12} md={6}>
          <h2 className={classes.descriptionTitle}>
            Store and manage all your files!
          </h2>
          <p className={classes.descriptionText}>
            Upload multiple files at once and keep them forever on this site.
            You can simply drag & drop your files to begin uploading.
          </p>
        </Grid>
      </Grid>
      <Grid container className={classes.mainContainer}>
        <Grid className={classes.homeGridItem} xs={12} sm={12} md={4}>
          <div className={classes.card}>
            <div className={classes.cardHeader}>
              <h3 className={classes.homeCardHeaderText}>
                Fast and instant downloading!
              </h3>
            </div>
            <div className={classes.cardBody}>
              <p className={classes.homeCardBody}>
                Our premium members benefit from no waiting time and direct
                downloads for all of their files. Unlike other file hosts we
                dont limit the transfer speed of our downloads.
              </p>
            </div>
          </div>
        </Grid>

        <Grid className={classes.homeGridItem} xs={12} sm={12} md={4}>
          <div className={classes.card}>
            <div className={classes.cardHeader}>
              <h3 className={classes.homeCardHeaderText}>Safe and Secure</h3>
            </div>
            <div className={classes.cardBody}>
              <p className={classes.homeCardBody}>
                Safely store and backup all your essential files. From family
                photos & videos to important documents, you can rely on us to
                store all your media securely and forever.
              </p>
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid container className={classes.secondContainer}>
        <Grid className={classes.homeGridItem} xs={12} sm={12} md={12}>
          <h1 className={classes.homeText}>What are you waiting for?</h1>
        </Grid>
      </Grid>
    </>
  );
};

Home.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.details.isAuthenticated,
});

export default connect(mapStateToProps)(Home);
