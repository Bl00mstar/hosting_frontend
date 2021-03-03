import React, { useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '@components/TrashFolder/Card.js';
import CardHeader from '@components/TrashFolder/CardHeader.js';
import { getUserTrash } from '@store/files/file.actions';
import useTrashList from '@hooks/TrashFolder/useTrashList';
import { styles } from '@assets/js/components/TrashFolder/trashFolder';

const useStyles = makeStyles(styles);

const TrashFolder = ({ getTrashList, trashData }) => {
  const [table, tableComponent] = useTrashList();

  const classes = useStyles();

  useEffect(() => {
    console.log(trashData);
    table({ param: ['', '', 'Name'], trashData: trashData });
  }, [trashData]);

  useEffect(() => {
    getTrashList();
  }, []);

  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Trash </h4>
      </CardHeader>
      {tableComponent}
    </Card>
  );
};

TrashFolder.propTypes = {
  getTrashList: PropTypes.func.isRequired,
  trashData: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  trashData: state.file.trash.items,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getTrashList: (x) => dispatch(getUserTrash(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrashFolder);
