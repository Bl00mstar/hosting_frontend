import { makeStyles } from '@material-ui/core';

const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBarPb: {
    [theme.breakpoints.up('sm')]: {
      width: `0px`,
      marginLeft: drawerWidth,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  bottomPush: {
    justifyContent: 'center',
    position: 'fixed',
    bottom: 0,
    textAlign: 'center',
    paddingBottom: 10,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  listSection: {
    width: '100%',
    height: 400,
    maxWidth: 300,
    backgroundColor: 'inherit',
  },

  content: {
    flexGrow: 1,

    padding: theme.spacing(3),
  },
}));
