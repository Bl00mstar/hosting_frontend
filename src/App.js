import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isUserAuthenticated } from '@store/user/user.actions';
import Private from '@layout/Private';

const App = ({ isUserAuthenticated }) => {
  useEffect(() => {
    isUserAuthenticated();
  }, []);

  return (
    <div className="App">
      <Private />
    </div>
  );
};

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isUserAuthenticated: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.details.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => {
  return {
    isUserAuthenticated: () => dispatch(isUserAuthenticated()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
