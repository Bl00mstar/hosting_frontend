import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { getFolders, foldersPath } from '@store/files/file.actions';

import {
  Modal,
  Backdrop,
  Fade,
  Card,
  MenuList,
  MenuItem,
  ListItem,
  Typography,
  Breadcrumbs,
  Link,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    color: 'red',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const FilesMove = ({ folders, getFolders, foldersPath, actionPath }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getFolders(actionPath);
    let localPathArr = actionPath.replace(/\//g, '/ ').split(' ');
    localPathArr.pop();
    // setLocalPath(localPathArr);
  }, [getFolders, actionPath]);

  const generatePath = (values) => {
    if (values) {
      return values.map((value) =>
        React.cloneElement(
          <MenuItem style={{ lineHeight: '0.1' }}>
            <ListItem
              onClick={() => foldersPath(actionPath + value.name + '/')}
            >
              <Typography variant="inherit">
                {actionPath + value.name}
              </Typography>
            </ListItem>
          </MenuItem>,
          { key: value.id }
        )
      );
    }
  };

  return (
    <Card margin="normal" style={{ width: '95%', marginTop: '5px' }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="textPrimary" href="/">
          Select path
        </Link>
        <Link color="inherit" href="/getting-started/installation/">
          Confirm
        </Link>
      </Breadcrumbs>
      Move to: /
      <button type="button" onClick={handleOpen}>
        select path
      </button>
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
            {/* in modal */}
            <MenuList>{folders && generatePath(folders)}</MenuList>
          </div>
        </Fade>
      </Modal>
    </Card>
  );
};

FilesMove.propTypes = {
  getFolders: PropTypes.func.isRequired,
  folders: PropTypes.array.isRequired,
  foldersPath: PropTypes.func.isRequired,
  actionPath: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  folders: state.file.action.folders,
  actionPath: state.file.action.path,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getFolders: (x) => dispatch(getFolders(x)),
    foldersPath: (x) => dispatch(foldersPath(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilesMove);

// const FilesMove = ({ folders, getFolders, foldersPath, actionPath }) => {
//   const [localPath, setLocalPath] = useState([]);

//           <Grid item xs={10}>
//             Selected path:
//             {localPath.map((el, key) => (
//               <Button key={key} size="small" variant="text">
//                 {el}
//               </Button>
//             ))}
//           </Grid>

//           <Grid item xs={12}>
//             <MenuList>{folders && generatePath(folders)}</MenuList>
//           </Grid>

//       </Box>
//     </div>
//   );
// };
