import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  getFolders,
  foldersPath,
  moveElements,
  handleCheck,
  getUserFiles,
} from '@store/files/file.actions';
import { RotateLeft, ArrowForwardIos } from '@material-ui/icons';
import {
  Modal,
  Backdrop,
  Fade,
  Card,
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

const FilesMove = ({
  folders,
  getFolders,
  foldersPath,
  actionPath,
  getFiles,
  path,
  checkedItems,
  move,
  handleCheck,
  filters,
}) => {
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
  }, [getFolders, actionPath]);

  const handleMoveButton = () => {
    move({ elements: checkedItems, path: actionPath });
    handleClose();
    setTimeout(() => {
      //nie sleected tylko check items
      handleCheck([]);
      getFiles({ path: path, filters: filters });
    }, 300);
  };

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
    <Card className={classes.card} margin="normal">
      <Button
        className={classes.button}
        variant="outlined"
        size="small"
        onClick={handleOpen}
      >
        Select Path
      </Button>
      {path !== '/' && (
        <Button className={classes.button} variant="outlined" size="small">
          Move to root
        </Button>
      )}

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
            <div style={{ height: '50px' }}>
              <Button
                variant="contained"
                size="small"
                className={classes.button}
                startIcon={<RotateLeft />}
                style={{ float: 'left' }}
                onClick={() => foldersPath('/')}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                size="small"
                className={classes.button}
                endIcon={<ArrowForwardIos />}
                style={{ float: 'right' }}
                onClick={() => handleMoveButton()}
              >
                Move
              </Button>
            </div>
            <div style={{ height: '60px' }}>
              <p>Selected elements: {checkedItems.length}</p>
              <p>Selected path: {actionPath}</p>
            </div>

            <MenuList>{folders && generatePath(folders)}</MenuList>
          </div>
        </Fade>
      </Modal>
    </Card>
  );
};

FilesMove.propTypes = {
  path: PropTypes.string.isRequired,
  getFolders: PropTypes.func.isRequired,
  folders: PropTypes.array.isRequired,
  foldersPath: PropTypes.func.isRequired,
  actionPath: PropTypes.string.isRequired,
  checkedItems: PropTypes.array.isRequired,
  move: PropTypes.func.isRequired,
  handleCheck: PropTypes.func.isRequired,
  getFiles: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  path: state.file.tree.path,
  folders: state.file.action.folders,
  actionPath: state.file.action.path,
  checkedItems: state.file.action.checked.items,
  filters: state.file.tree.filters,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getFolders: (x) => dispatch(getFolders(x)),
    foldersPath: (x) => dispatch(foldersPath(x)),
    move: (x) => dispatch(moveElements(x)),
    handleCheck: (x) => dispatch(handleCheck(x)),
    getFiles: (x) => dispatch(getUserFiles(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilesMove);
