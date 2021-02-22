import React from 'react';
import PropTypes from 'prop-types';
import GridItem from '@components/Grid/GridItem.js';
import GridContainer from '@components/Grid/GridContainer.js';
import { connect } from 'react-redux';
import Button from '@components/CustomButtons/Button.js';
import { makeStyles } from '@material-ui/core/styles';
import {
  deleteItem,
  getUserFiles,
  handleCheck,
} from '@store/files/file.actions';

const useStyles = makeStyles(() => ({}));

const FilesDeleteToTrash = ({
  checkedItems,
  moveToTrash,
  getFiles,
  path,
  handleCheck,
  filters,
}) => {
  const classes = useStyles();

  const handleMoveToTrash = () => {
    moveToTrash({ items: checkedItems, path: path });
    setTimeout(() => {
      getFiles({ path: path, filters: filters });
      handleCheck([]);
    }, 100);
  };

  return (
    <GridContainer style={{ textAlign: 'center' }}>
      <GridItem xs={12} sm={12} md={12}>
        <div>
          Folders will be deleted. Existing files will be moved to trash folder.
        </div>

        <Button
          className={classes.button}
          variant="outlined"
          size="small"
          onClick={() => handleMoveToTrash()}
        >
          Confirm
        </Button>
      </GridItem>
    </GridContainer>
  );
};

FilesDeleteToTrash.propTypes = {
  getFiles: PropTypes.func.isRequired,
  checkedItems: PropTypes.array.isRequired,
  moveToTrash: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  handleCheck: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  checkedItems: state.file.action.checked.items,
  path: state.file.tree.path,
  filters: state.file.tree.filters,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getFiles: (x) => dispatch(getUserFiles(x)),
    moveToTrash: (x) => dispatch(deleteItem(x)),
    handleCheck: (x) => dispatch(handleCheck(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilesDeleteToTrash);
