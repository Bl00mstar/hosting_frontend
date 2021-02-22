import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setFilters } from '@store/files/file.actions';

import { ListItem, ListItemIcon, Grid } from '@material-ui/core';

import Folder from '@material-ui/icons/Folder';
import InsertDriveFile from '@material-ui/icons/InsertDriveFile';

import TextRotateUp from '@material-ui/icons/TextRotateUp';
import TextRotationDown from '@material-ui/icons/TextRotationDown';
import TextFormat from '@material-ui/icons/TextFormat';

import Timer from '@material-ui/icons/Timer';
import Timelapse from '@material-ui/icons/Timelapse';
import { EventBusy } from '@material-ui/icons';

const FilesFilter = ({ filters, setFilters }) => {
  useEffect(() => {}, [filters]);

  const handleSortEvent = ({ section, type }) => {
    if (section === 'alpha') {
      setFilters({
        ...filters,
        date: { active: false, type: 0 },
        alpha: { active: true, type: type },
      });
    } else if (section === 'date') {
      setFilters({
        ...filters,
        alpha: { active: false, type: 0 },
        date: { active: true, type: type },
      });
    } else {
      setFilters({ ...filters, [section]: { type: type } });
    }
  };

  return (
    <Grid item xs={12}>
      <ListItem style={{}}>
        <ListItemIcon style={{ cursor: 'pointer' }}>
          {filters.folder.type === -1 && (
            <Folder
              onClick={() => handleSortEvent({ section: 'folder', type: 1 })}
            />
          )}
          {filters.folder.type === 1 && (
            <InsertDriveFile
              onClick={() => handleSortEvent({ section: 'folder', type: -1 })}
            />
          )}
        </ListItemIcon>
        <ListItemIcon style={{ cursor: 'pointer' }}>
          {filters.alpha.type === 1 && (
            <TextRotateUp
              onClick={() => handleSortEvent({ section: 'alpha', type: -1 })}
            />
          )}
          {filters.alpha.type === -1 && (
            <TextRotationDown
              onClick={() => handleSortEvent({ section: 'alpha', type: 1 })}
            />
          )}
          {filters.alpha.type === 0 && (
            <TextFormat
              onClick={() => handleSortEvent({ section: 'alpha', type: 1 })}
            />
          )}
        </ListItemIcon>
        <ListItemIcon style={{ cursor: 'pointer' }}>
          {filters.date.type === 1 && (
            <Timer
              onClick={() => handleSortEvent({ section: 'date', type: -1 })}
            />
          )}
          {filters.date.type === -1 && (
            <Timelapse
              onClick={() => handleSortEvent({ section: 'date', type: 1 })}
            />
          )}
          {filters.date.type === 0 && (
            <EventBusy
              onClick={() => handleSortEvent({ section: 'date', type: 1 })}
            />
          )}
        </ListItemIcon>
      </ListItem>
    </Grid>
  );
};

FilesFilter.propTypes = {
  files: PropTypes.array.isRequired,
  setFilters: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  files: state.file.tree.items,
  filters: state.file.tree.filters,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setFilters: (x) => dispatch(setFilters(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilesFilter);
