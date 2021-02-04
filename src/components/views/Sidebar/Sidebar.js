import React from 'react';
import PropTypes from 'prop-types';
import { routes } from '../../../routes';
import { Link } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
  Hidden,
} from '@material-ui/core/';
import { useTheme } from '@material-ui/core/styles';
import { useStyles } from '@styles/DashboardStyle';

const Sidebar = (props) => {
  const { window, mobileOpen, handleDrawerToggle } = props;
  const theme = useTheme();
  const classes = useStyles();

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {routes.map(({ description, path, type, icon }, key) => {
          if (type.includes('user')) {
            return (
              <Link
                key={key}
                to={`/${path}`}
                style={{ textDecoration: 'none', color: '#606060' }}
              >
                <ListItem button key={key}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={description} />
                </ListItem>
              </Link>
            );
          }
        })}
      </List>
      <Divider />
      <List>
        {routes.map(({ description, path, type, icon }, key) => {
          if (type.includes('files')) {
            return (
              <Link
                key={key}
                to={`/${path}`}
                style={{ textDecoration: 'none', color: '#606060' }}
              >
                <ListItem button key={key}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={description} />
                </ListItem>
              </Link>
            );
          }
        })}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
};
Sidebar.propTypes = {
  window: PropTypes.func,
  mobileOpen: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
};

export default Sidebar;
