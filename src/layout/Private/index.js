import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '@components/Navbar/Navbar.js';
import Footer from '@components/Footer/Footer.js';
import Sidebar from '@components/Sidebar/Sidebar.js';
// import FixedPlugin from '@components/FixedPlugin/FixedPlugin.js';
import { routes } from '../../routes';
import { useRoutes, useNavigate } from 'react-router-dom';

import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import styles from '@assets/jss/material-dashboard-react/layouts/adminStyle.js';

import bgImage from '@assets/img/sidebar-12.jpg';

const useStyles = makeStyles(styles);

let ps;
const PrivateLayout = ({ isAuthenticated, ...rest }) => {
  const mainPanel = React.createRef();
  const classes = useStyles();
  const element = useRoutes(routes);
  const color = 'green';
  const image = bgImage;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  let navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('account/login');
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  React.useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = 'hidden';
    }
    window.addEventListener('resize', resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy();
      }
      window.removeEventListener('resize', resizeFunction);
    };
  }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
      <Sidebar
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div
        style={{ backgroundColor: '#c2bebe' }}
        className={classes.mainPanel}
        ref={mainPanel}
      >
        <Navbar handleDrawerToggle={handleDrawerToggle} {...rest} />

        <div className={classes.content}>
          <div className={classes.container}>{element}</div>
        </div>
        <Footer />
      </div>
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
