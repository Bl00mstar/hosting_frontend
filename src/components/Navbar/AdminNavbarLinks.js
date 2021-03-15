import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Hidden from '@material-ui/core/Hidden';
import Person from '@material-ui/icons/Person';
import Poppers from '@material-ui/core/Popper';
import { userLogout } from '@store/user/user.actions';
import { setMessage } from '@store/alerts/alert.actions';
import Button from '@components/CustomButtons/Button.js';

import styles from '@assets/jss/material-dashboard-react/components/headerLinksStyle.js';
import { ListItem } from '@material-ui/core';

const useStyles = makeStyles(styles);

const AdminNavbarLinks = ({ logout, setMessage }) => {
  const classes = useStyles();

  const [openProfile, setOpenProfile] = React.useState(null);
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };

  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };

  return (
    <div>
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? 'transparent' : 'white'}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? 'profile-menu-list-grow' : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
        >
          <Person className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            ' ' +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={classes.dropdownItem}
                    >
                      <ListItem
                        onClick={() =>
                          setMessage({
                            message: 'User logged out',
                            type: 'success',
                          }) && logout()
                        }
                      >
                        Logout
                      </ListItem>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  );
};

AdminNavbarLinks.propTypes = {
  logout: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(userLogout()),
    setMessage: (x) => dispatch(setMessage(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminNavbarLinks);
