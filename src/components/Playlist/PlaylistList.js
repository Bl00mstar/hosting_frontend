import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import Edit from '@material-ui/icons/Edit';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';
import Input from '@material-ui/core/Input';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import tsstyles from '@assets/jss/material-dashboard-react/components/tasksStyle.js';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(tsstyles);
const PlaylistList = ({ playlistList, deletePlaylist, editPlaylist }) => {
  const classes = useStyles();
  const [selectedPlaylist, setSelectedPlaylist] = useState({});

  const editPlaylistName = (data) => {
    setSelectedPlaylist(data);
  };

  const handleChangePlaylistName = (name) => {
    setSelectedPlaylist((selectedPlaylist) => ({
      ...selectedPlaylist,
      name: name,
    }));
  };

  const handleEditPlaylist = () => {
    editPlaylist({ id: selectedPlaylist._id, newName: selectedPlaylist.name });
    setSelectedPlaylist({});
  };

  const handleSelectedPlaylist = (a) => {
    console.log(a);
  };

  return (
    <>
      <h4 className={classes.cardTitle}>PLAYLISTS</h4>
      <Table size={'small'}>
        <TableBody>
          {playlistList.map((value, key) => (
            <TableRow
              hover={true}
              key={key}
              //   className={classes.tableRow}
              onClick={() => handleSelectedPlaylist(value)}
            >
              <TableCell className={classes.tableCell}></TableCell>
              {selectedPlaylist._id === value._id ? (
                <>
                  <TableCell className={classes.tableCell}>
                    <Input
                      value={selectedPlaylist.name}
                      onChange={(e) => handleChangePlaylistName(e.target.value)}
                    />
                  </TableCell>
                  <TableCell className={classes.tableActions}>
                    <Tooltip
                      id="tooltip-top"
                      title="Change"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                      onClick={() => handleEditPlaylist()}
                    >
                      <IconButton
                        aria-label="Check"
                        className={classes.tableActionButton}
                      >
                        <Check
                          className={
                            classes.tableActionButtonIcon + ' ' + classes.edit
                          }
                        />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell
                    className={classes.tableCell}
                    style={{ width: '900px' }}
                  >
                    <div>{value.name}</div>
                  </TableCell>
                  <TableCell className={classes.tableActions}>
                    <Tooltip
                      id="tooltip-top"
                      title="Change playlist name"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                      onClick={() => {
                        console.log(value);
                        editPlaylistName(value);
                      }}
                    >
                      <IconButton
                        aria-label="Edit"
                        className={classes.tableActionButton}
                      >
                        <Edit
                          className={
                            classes.tableActionButtonIcon + ' ' + classes.edit
                          }
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      id="tooltip-top-start"
                      title="Remove"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                      onClick={() => deletePlaylist(value._id)}
                    >
                      <IconButton
                        aria-label="Close"
                        className={classes.tableActionButton}
                      >
                        <Close
                          className={
                            classes.tableActionButtonIcon + ' ' + classes.close
                          }
                        />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

PlaylistList.propTypes = {
  playlistList: PropTypes.array.isRequired,
  deletePlaylist: PropTypes.func.isRequired,
  editPlaylist: PropTypes.func.isRequired,
};

export default PlaylistList;
