import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import { useStyles } from '@styles/DashboardStyle';
import Sidebar from '@components/Sidebar';
import Navbar from '@components/Navbar';
import { routes } from '../../routes';
import { useRoutes, useNavigate } from 'react-router-dom';

const PrivateLayout = ({ isAuthenticated }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const classes = useStyles();
  const element = useRoutes(routes);
  let navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('account/login');
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar handleDrawerToggle={handleDrawerToggle} />
      <Sidebar
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {element}
      </main>
      <footer className={classes.bottomPush}>
        xdsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaad
      </footer>
    </div>
  );
};

PrivateLayout.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.details.isAuthenticated,
});

export default connect(mapStateToProps)(PrivateLayout);