import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserTrash, handleCheck } from '@store/files/file.actions';
import { useStyles } from '@styles/DashboardStyle';
import {
  Typography,
  Grid,
  List,
  ListItem,
  Checkbox,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core/';
import { InsertDriveFile } from '@material-ui/icons';
import Delete from './Delete';
import Restore from './Restore';

const Trash = ({ getTrash, trashList, handleCheck, checkedItems }) => {
  const classes = useStyles();

  useEffect(() => {
    handleCheck([]);
    getTrash();
  }, [getTrash, handleCheck]);

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

  const generate = (values) => {
    return values.map((value) =>
      React.cloneElement(
        <ListItem>
          <Checkbox
            value={value.id}
            inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
            onChange={(e) => {
              handleCheckbox(e, value);
            }}
          />
          <ListItemIcon>
            <InsertDriveFile />
          </ListItemIcon>
          <ListItemText primary={value.name} />
          <ListItemText primary={value.date} />
        </ListItem>,
        {
          key: value.id,
        }
      )
    );
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className={classes.title}>
            Trash folder:
          </Typography>
          <Delete />
          <Restore />
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
  handleCheck: PropTypes.func.isRequired,
  checkedItems: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  trashList: state.file.trash.items,
  checkedItems: state.file.action.checked.items,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getTrash: () => dispatch(getUserTrash()),
    handleCheck: (x) => dispatch(handleCheck(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Trash);
