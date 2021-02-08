import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogout } from '@store/user/user.actions';
import MenuIcon from '@material-ui/icons/Menu';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from '@material-ui/core/';
import { useStyles } from '@styles/DashboardStyle';

const Navbar = ({ handleDrawerToggle, logout }) => {
  const classes = useStyles();
  let navigate = useNavigate();
  return (
    <AppBar
      position="fixed"
      className={classes.appBar}
      style={{ background: '#606060' }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          .
        </Typography>
        <Button color="inherit" onClick={() => logout() && navigate('/')}>
          Sign out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  handleDrawerToggle: PropTypes.func,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(userLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
