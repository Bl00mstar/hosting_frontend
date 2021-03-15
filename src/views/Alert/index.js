/*es-list disable*/
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import AddAlert from '@material-ui/icons/AddAlert';
import Error from '@material-ui/icons/Error';
import Snackbar from '@components/Notification/Snackbar.js';

import { clearMessage } from '@store/alerts/alert.actions';

const Alert = (props) => {
  const [br, setBR] = React.useState(false);
  const { message, type, timeout, clearMessage } = props;

  useEffect(() => {
    if (message) {
      setBR(true);
      setTimeout(() => {
        setBR(false);
        clearMessage();
      }, timeout);
    }
  }, [message]);

  return (
    <>
      {message && (
        <Snackbar
          place="br"
          color={type}
          icon={Error}
          message={message}
          open={br}
          closeNotification={() => setBR(false)}
          close
        ></Snackbar>
      )}
    </>
  );
};

Alert.defaultProps = {
  timeout: 6000,
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  timeout: PropTypes.number,
  clearMessage: PropTypes.func,
};

const mapStateToProps = (state) => ({
  message: state.alert.message,
  type: state.alert.type,
});

const mapDispatchToProps = (dispatch) => {
  return {
    clearMessage: () => dispatch(clearMessage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
