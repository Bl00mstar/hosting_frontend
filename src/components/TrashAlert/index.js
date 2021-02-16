import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert } from '@material-ui/lab';
import { trashAlertClear } from '@store/files/file.actions';

const TrashAlert = ({ message, type, clearTrashAlerts }) => {
  const [showAlerts, setShowAlerts] = useState(false);

  useEffect(() => {
    if (message) {
      setShowAlerts(true);
      setTimeout(() => {
        setShowAlerts(false);
        clearTrashAlerts();
      }, 2500);
    }
  }, [message, clearTrashAlerts]);

  return (
    <>
      {showAlerts ? (
        <Alert
          style={{
            position: 'fixed',
            right: '18px',
          }}
          severity={type}
        >
          {message}
        </Alert>
      ) : (
        <></>
      )}
    </>
  );
};

TrashAlert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  clearTrashAlerts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  message: state.file.alert.trash.message,
  type: state.file.alert.trash.type,
});

const mapDispatchToProps = (dispatch) => {
  return {
    clearTrashAlerts: () => dispatch(trashAlertClear()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrashAlert);
