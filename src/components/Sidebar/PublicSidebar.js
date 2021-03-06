/*eslint-disable*/
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import Logo from '@assets/cfbrand.svg';
// core components

import sidebarImage from '@assets/sidebarImage.svg';

import styles from '@assets/jss/material-dashboard-react/components/sidebarStyle.js';
import { routes } from '../../routes';
const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const classes = useStyles();
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }
  const { color, logo, image, logoText } = props;
  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        if (prop.type.includes('public')) {
          var activePro = ' ';
          var listItemClasses;

          listItemClasses = classNames({
            [' ' + classes[color]]: activeRoute(prop.path),
          });

          const whiteFontClasses = classNames({
            [' ' + classes.whiteFont]: activeRoute(prop.path),
            //
          });
          return (
            <NavLink
              to={prop.path}
              className={activePro + classes.item}
              activeClassName="active"
              key={key}
            >
              <ListItem button className={classes.itemLink + listItemClasses}>
                <ListItemText
                  primary={props.rtlActive ? prop.rtlName : prop.description}
                  className={classNames(classes.itemText, whiteFontClasses, {
                    [classes.itemTextRTL]: props.rtlActive,
                  })}
                  disableTypography={true}
                />
              </ListItem>
            </NavLink>
          );
        }
      })}
    </List>
  );

  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="right"
          open={props.open}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <img
            style={{
              marginLeft: '50px',
              width: '150px',
              height: '150px',
              zIndex: '11',
              justifyContent: 'center',
            }}
            src={sidebarImage}
          />

          <div style={{ width: '260px' }} className={classes.sidebarWrapper}>
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: 'url(' + image + ')' }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(['purple', 'blue', 'green', 'orange', 'red']),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool,
};
