import React, { useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '@components/TrashFolder/Card.js';
import CardHeader from '@components/TrashFolder/CardHeader.js';
import { getUserTrash } from '@store/files/file.actions';
import useTrashList from '@hooks/TrashFolder/useTrashList';
import useTrashOptions from '@hooks/TrashFolder/useTrashOptions';
import { styles } from '@assets/js/components/TrashFolder/trashFolder';

const useStyles = makeStyles(styles);

const TrashFolder = ({ getTrashList, trashData, checked }) => {
  const [table, tableComponent] = useTrashList();
  const [options, optionsComponent] = useTrashOptions();
  const classes = useStyles();

  useEffect(() => {
    options(checked.length);
    if (checked.length === 1) {
      console.log(checked);
    }
  }, [options, checked]);

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
      {optionsComponent}
      {tableComponent}
    </Card>
  );
};

TrashFolder.propTypes = {
  getTrashList: PropTypes.func.isRequired,
  trashData: PropTypes.array.isRequired,
  checked: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  trashData: state.file.trash.items,
  checked: state.file.trash.checked.items,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getTrashList: (x) => dispatch(getUserTrash(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrashFolder);
