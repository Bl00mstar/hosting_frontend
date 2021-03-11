/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import { ListItemIcon, Tooltip } from '@material-ui/core';
// core components
import styles from '@assets/jss/components/FilesTree/tableStyle.js';
import FilesFilter from '@components/FilesTree/FilesFilter';
import { setDirectoryPath, foldersPath } from '@store/files/file.actions';
import { handleCheck } from '@store/files/file.actions';
import { dateConverter } from '@utils/dashboardUtils';
import {
  InsertDriveFile,
  Folder,
  GetApp,
  Movie,
  StarBorder,
} from '@material-ui/icons';
import useFileDownloader from '@hooks/FilesTree/useFileDownloader';
import { playFile } from '@store/playlists/playlist.actions';
import { useNavigate } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import { getPlaylists, selectFile } from '@store/playlists/playlist.actions';
import PlaylistMenu from './PlaylistMenu';

const useStyles = makeStyles(styles);

const FilesTable = (props) => {
  let navigate = useNavigate();
  const classes = useStyles();
  const {
    tableHead,
    tableData,
    tableHeaderColor,
    checkedItems,
    handleCheck,
    path,
    getFiles,
    playFile,
    getPlaylists,
    playlistList,
    selectFile,
  } = props;
  const [isChecked, setIsChecked] = useState({ values: [] });
  const [downloadFile, downloaderComponentUI] = useFileDownloader();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getPlaylists();
  }, []);

  const download = (file) => downloadFile(file);
  const handleCheckbox = (e, data) => {
    let filtered = checkedItems.filter((el) => el.id === e.target.value);
    let newChecked = { id: data.id, name: data.name, type: data.type };
    if (typeof filtered !== 'undefined' && filtered.length > 0) {
      let newFilesArray = checkedItems.filter((el) => el.id !== e.target.value);
      handleCheck(newFilesArray);
    } else {
      handleCheck([...checkedItems, newChecked]);
    }
  };

  const handleCheckElement = (value) => {
    if (isChecked.values.includes(value.id)) {
      let filtered = isChecked.values.filter((el) => el !== value.id);
      setIsChecked({
        values: filtered,
      });
    } else {
      setIsChecked((isChecked) => ({
        ...isChecked,
        values: [...isChecked.values, value.id],
      }));
    }
  };

  return (
    <>
      <div className={classes.tableResponsive}>
        <FilesFilter />
        <Table className={classes.table}>
          {tableHead !== undefined ? (
            <TableHead className={classes[tableHeaderColor + 'TableHeader']}>
              <TableRow className={classes.tableHeadRow}>
                {tableHead.map((prop, key) => {
                  return (
                    <TableCell
                      className={
                        classes.tableCell + ' ' + classes.tableHeadCell
                      }
                      key={key}
                    >
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
          ) : null}
          <TableBody>
            {tableData.map((prop, key) => {
              return (
                <TableRow key={key} className={classes.tableBodyRow}>
                  <TableCell
                    className={classes.tableCell}
                    style={{ width: '15px' }}
                  >
                    <Checkbox
                      value={prop.id}
                      checked={
                        isChecked.values.includes(prop.id) ? true : false
                      }
                      inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                      style={{ color: 'green' }}
                      onChange={(e) => {
                        handleCheckElement(prop);
                        handleCheckbox(e, prop);
                      }}
                    />
                  </TableCell>

                  {prop.type === 'folder' ? (
                    <>
                      <TableCell
                        className={classes.tableCell}
                        style={{ width: '15px' }}
                      >
                        <ListItemIcon style={{ marginTop: '4px' }}>
                          <Folder />
                        </ListItemIcon>
                      </TableCell>
                      <TableCell
                        className={classes.tableCell}
                        style={{ cursor: 'pointer' }}
                        onClick={() => getFiles(path + prop.name + '/')}
                      >
                        {prop.name}
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell
                        className={classes.tableCell}
                        style={{ width: '15px' }}
                      >
                        <ListItemIcon style={{ marginTop: '4px' }}>
                          <InsertDriveFile />
                        </ListItemIcon>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {prop.name}
                      </TableCell>
                    </>
                  )}
                  <TableCell className={classes.tableCell}>
                    {prop.type === 'file' && (
                      <>
                        <Tooltip
                          title="watch"
                          onClick={() =>
                            playFile(prop.id) && navigate('/user/playlist')
                          }
                        >
                          <ListItemIcon>
                            <Movie style={{ cursor: 'pointer' }} />
                          </ListItemIcon>
                        </Tooltip>
                        <Tooltip
                          title="Add to playlist"
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            selectFile(prop) && handleOpen(true);
                          }}
                        >
                          <ListItemIcon
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                          >
                            <StarBorder />
                          </ListItemIcon>
                        </Tooltip>
                      </>
                    )}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {prop.type === 'file' && (
                      <Tooltip title="download">
                        <ListItemIcon
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            download({ id: prop.id, name: prop.name });
                          }}
                        >
                          <GetApp />
                        </ListItemIcon>
                      </Tooltip>
                    )}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {dateConverter(prop.date)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {downloaderComponentUI}
      <PlaylistMenu
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
    </>
  );
};

FilesTable.propTypes = {
  selectFile: PropTypes.func.isRequired,
  getPlaylists: PropTypes.func.isRequired,
  playlistList: PropTypes.array.isRequired,
  getFiles: PropTypes.func.isRequired,
  setPath: PropTypes.func.isRequired,
  files: PropTypes.array.isRequired,
  checkedItems: PropTypes.array.isRequired,
  handleCheck: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray',
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  playFile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  playlistList: state.playlist.list,
  path: state.file.tree.path,
  files: state.file.tree.items,
  checkedItems: state.file.action.checked.items,
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleCheck: (x) => dispatch(handleCheck(x)),
    getFiles: (x) => dispatch(setDirectoryPath(x)),
    setPath: (x) => dispatch(foldersPath(x)),
    playFile: (id) => dispatch(playFile(id)),
    getPlaylists: () => dispatch(getPlaylists()),
    selectFile: (id) => dispatch(selectFile(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilesTable);
