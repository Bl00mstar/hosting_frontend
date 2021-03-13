// /*eslint-disable*/
import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Button from '@components/CustomButtons/Button.js';
// import styles from '@assets/jss/material-dashboard-react/components/headerStyle.js';

import { routes } from '../../routes';

// const useStyles = makeStyles(styles);

//   const classes = useStyles();

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles(() => ({
  grow: {
    flexGrow: 1,
  },
}));

const Header = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <div className={classes.grow} />
          <Hidden smDown implementation="css">
            {routes.map((route, idx) => {
              if (route.type.includes('public')) {
                return (
                  <Button
                    edge="end"
                    key={idx}
                    color="transparent"
                    href="#"
                    //   className={classes.publicTitle}
                  >
                    {route.description}
                  </Button>
                );
              }
            })}
          </Hidden>
          <Hidden mdUp implementation="css">
            <IconButton
              color="inherit"
              edge="end"
              aria-label="open drawer"
              onClick={props.handleDrawerToggle}
            >
              <Menu />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

Header.propTypes = {
  handleDrawerToggle: PropTypes.func,
};

export default Header;
