import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
// core components
import styles from '@assets/jss/material-dashboard-react/components/footerStyle.js';

const useStyles = makeStyles(styles);

export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.publicLeft}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a
                target="_blank"
                href="https://devopsnotes.xyz/"
                className={classes.block}
                rel="noreferrer"
              >
                Home
              </a>
            </ListItem>

            <ListItem className={classes.inlineBlock}>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://kural.pl/"
                className={classes.block}
              >
                Portfolio
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/Bl00mstar"
                className={classes.block}
              >
                Github
              </a>
            </ListItem>
          </List>
        </div>
        <p className={classes.publicRight}>
          <span>&copy; {1900 + new Date().getYear()} kkam</span>
        </p>
      </div>
    </footer>
  );
}
