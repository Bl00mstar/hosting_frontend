import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert } from '@material-ui/lab';
import { clearAlertFiles } from '@store/files/file.actions';

const FileAlerts = ({ message, type, clearAlerts }) => {
  const [showAlerts, setShowAlerts] = useState(false);

  useEffect(() => {
    if (message) {
      setShowAlerts(true);
      setTimeout(() => {
        clearAlerts();
        setShowAlerts(false);
      }, 2500);
    }
  }, [message, clearAlerts]);

  return (
    <>
      {showAlerts ? (
        <Alert
          style={{
            position: 'fixed',
            right: '18px',
            bottom: '18px',
            zIndex: '999',
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

FileAlerts.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  clearAlerts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  message: state.file.alert.folder.message,
  type: state.file.alert.folder.type,
});

const mapDispatchToProps = (dispatch) => {
  return {
    clearAlerts: () => dispatch(clearAlertFiles()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileAlerts);
