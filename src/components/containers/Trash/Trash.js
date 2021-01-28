import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserTrash } from '@store/files/file.actions';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

function generate(values) {
  return values.map((value) =>
    React.cloneElement(
      <ListItem>
        <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
        <ListItemIcon>
          <InsertDriveFileIcon />
        </ListItemIcon>
        <ListItemText primary={value} />
      </ListItem>,
      {
        key: value,
      }
    )
  );
}

const Trash = ({ getTrash, trashList }) => {
  const classes = useStyles();
  useEffect(() => {
    getTrash();
  }, [getTrash]);
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className={classes.title}>
            Path: /? usuń/przywróc
          </Typography>
          <div className={classes.demo}>
            <List dense={true}>{generate(trashList)}</List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

Trash.propTypes = {
  getTrash: PropTypes.func,
  trashList: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  trashList: state.file.trash.files,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getTrash: () => dispatch(getUserTrash()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Trash);
