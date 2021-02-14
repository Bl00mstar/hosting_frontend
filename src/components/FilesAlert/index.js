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
      }, 3000);
    }
  }, [message, clearAlerts]);

  return (
    <>
      {showAlerts ? (
        <Alert
          style={{ marginBottom: '5px', marginRight: '5px', marginTop: '5px' }}
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
