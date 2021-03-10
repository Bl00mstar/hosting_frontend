// import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import MenuItem from '@material-ui/core/MenuItem';
// import { getPlaylists } from '@store/playlists/playlist.actions';
// import Add from '@material-ui/icons/Add';
// import ListItemIcon from '@material-ui/core/IconButton';

// const PlaylistMenu = (props) => {
//   const { getPlaylists, playlistList, handleClose, key } = props;
//   const { id } = props.file;
//   useEffect(() => {
//     console.log(id);
//     getPlaylists();
//   }, []);

//   const handleClick = (fileId, optionId) => {
//     console.log(fileId);
//     console.log(optionId);
//   };

//   return (
//     <div key={key}>
//       {playlistList.map((option, idx) => (
//         <MenuItem key={idx} onClick={handleClose}>
//           <ListItemIcon size="small">
//             <Add onClick={() => handleClick(id, option._id)} />
//           </ListItemIcon>
//           {option.name}
//         </MenuItem>
//       ))}
//     </div>
//   );
// };

// PlaylistMenu.propTypes = {
//   getPlaylists: PropTypes.func.isRequired,
//   playlistList: PropTypes.array.isRequired,
//   handleClose: PropTypes.func.isRequired,
//   file: PropTypes.object.isRequired,
//   key: PropTypes.number.isRequired,
// };

// const mapStateToProps = (state) => ({
//   playlistList: state.playlist.list,
// });

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getPlaylists: () => dispatch(getPlaylists()),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(PlaylistMenu);
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
} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '400px',
    minHeight: '400px',
  },
  card: {
    justify: 'center',
    width: '95%',
    marginTop: '5px',
    textAlign: 'center',
  },
  button: {
    marginTop: '9px',
    marginRight: '7px',
    marginBottom: '11px',
  },
}));

const PlaylistMenu = ({ handleOpen, handleClose, open }) => {
  const classes = useStyles();

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
          <div className={classes.paper}>pdw</div>
        </Fade>
      </Modal>
    </>
  );
};

PlaylistMenu.propTypes = {};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistMenu);
