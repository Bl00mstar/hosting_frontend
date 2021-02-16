import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TrashList from '@components/TrashList';
import TrashAlert from '@components/TrashAlert';
import TrashButton from '@components/TrashButton';
import { getUserTrash } from '@store/files/file.actions';

const Trash = ({ getTrashList }) => {
  useEffect(() => {
    getTrashList();
  }, []);

  return (
    <>
      <TrashAlert />
      <TrashButton />
      <TrashList />
    </>
  );
};

Trash.propTypes = {
  getTrashList: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    getTrashList: (x) => dispatch(getUserTrash(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Trash);
