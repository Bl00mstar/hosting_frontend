/*eslint-disable*/
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Modal,
  Backdrop,
  Fade,
  MenuList,
  MenuItem,
  ListItem,
  Typography,
  Button,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Checkbox,
} from '@material-ui/core';
import {
  getPlaylists,
  addFileToPlaylist,
  deleteFileFromPlaylist,
} from '@store/playlists/playlist.actions';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 0, 1),
    width: '400px',
  },
  card: {
    justify: 'center',
    width: '95%',
    marginTop: '5px',
    textAlign: 'center',
  },
}));

const PlaylistMenu = ({
  handleOpen,
  handleClose,
  open,
  getPlaylists,
  playlists,
  file,
  addFileToPlaylist,
  deleteFileFromPlaylist,
}) => {
  const classes = useStyles();

  useEffect(() => {
    getPlaylists();
  }, []);

  const handleActivePlaylist = (data) => {
    const { playlist, file, idx } = data;
    if (playlists[idx].files.includes(file)) {
      deleteFileFromPlaylist({ playlist: playlist, file: file });
    } else {
      addFileToPlaylist({ playlist: playlist, file: file });
    }
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        className={classes.modal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <p style={{ padding: 3 }}>{file.name}</p>
            <Table size="small">
              <TableBody>
                {playlists.map((playlist, idx) => (
                  <TableRow key={idx} style={{ height: '50px' }}>
                    <TableCell style={{ width: '15px', height: '50px' }}>
                      <Checkbox
                        value={playlist._id}
                        checked={
                          playlists[idx].files.includes(file.id) ? true : false
                        }
                        onClick={() => {
                          handleActivePlaylist({
                            playlist: playlist._id,
                            file: file.id,
                            idx: idx,
                          });
                        }}
                      />
                    </TableCell>
                    <TableCell>{playlist.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

PlaylistMenu.propTypes = {
  playlists: PropTypes.array.isRequired,
  getPlaylists: PropTypes.func.isRequired,
  addFileToPlaylist: PropTypes.func.isRequired,
  deleteFileFromPlaylist: PropTypes.func.isRequired,
  file: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  playlists: state.playlist.list,
  file: state.playlist.selectedFile,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getPlaylists: () => dispatch(getPlaylists()),
    addFileToPlaylist: (x) => dispatch(addFileToPlaylist(x)),
    deleteFileFromPlaylist: (x) => dispatch(deleteFileFromPlaylist(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistMenu);
