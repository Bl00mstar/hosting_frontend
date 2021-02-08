import React from 'react';

import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import TodayIcon from '@material-ui/icons/Today';
import { ListItem, ListItemIcon } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import FolderIcon from '@material-ui/icons/Folder';
export default function index() {
  return (
    <ListItem style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <ListItemIcon>
        <SortByAlphaIcon />
      </ListItemIcon>
      <ListItemIcon>
        <TodayIcon />
      </ListItemIcon>
      <ListItemIcon>
        <FileCopyIcon />
      </ListItemIcon>
      <ListItemIcon>
        <FolderIcon />
      </ListItemIcon>
    </ListItem>
  );
}
