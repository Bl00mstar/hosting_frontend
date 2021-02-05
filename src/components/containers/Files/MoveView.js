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

const MoveView = ({ folders, getFolders, foldersPath, actionPath }) => {
  const [localPath, setLocalPath] = useState([]);
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
    <Grid component="form" container required style={{ width: '90%' }}>
      <Box width={1} m={2}>
        <Typography variant="body2">
          Selected:
          {localPath.map((el, key) => (
            <Button key={key} size="small" variant="text">
              {el}
            </Button>
          ))}
        </Typography>
        <MenuList>{folders && generatePath(folders)}</MenuList>

        <Box textAlign="center" m={1}>
          <Button variant="contained" size="small">
            Move
          </Button>
        </Box>
      </Box>
    </Grid>
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
