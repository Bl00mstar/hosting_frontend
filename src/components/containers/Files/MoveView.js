import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  MenuList,
  ListItem,
  Typography,
  MenuItem,
  Button,
  Box,
  Grid,
} from '@material-ui/core';
import { getFolders, foldersPath } from '@store/files/file.actions';
import { useStyles } from '@styles/DashboardStyle';

const MoveView = ({ folders, getFolders, foldersPath, actionPath }) => {
  const [localPath, setLocalPath] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    getFolders(actionPath);
    let localPathArr = actionPath.replace(/\//g, '/ ').split(' ');
    localPathArr.pop();
    setLocalPath(localPathArr);
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
    <div className={classes.root}>
      <Box
        width={1}
        style={{
          overflow: 'auto',
          justifyContent: 'center',
        }}
      >
        <Grid
          container
          spacing={2}
          style={{
            maxHeight: '200px',
            overflow: 'auto',
            // textAlign: 'center',
            justifyContent: 'center',
            margin: '0 auto',
          }}
        >
          <Grid item xs={10}>
            Selected path:
            {localPath.map((el, key) => (
              <Button key={key} size="small" variant="text">
                {el}
              </Button>
            ))}
          </Grid>
          <Grid item xs={2}>
            <Button size="small" variant="contained">
              Move
            </Button>
          </Grid>
          <Grid item xs={12}>
            <MenuList>{folders && generatePath(folders)}</MenuList>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

MoveView.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(MoveView);
