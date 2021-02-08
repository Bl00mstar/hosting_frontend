import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Public from '@layout/Public';

const App = () => {
  return (
    <div className="App">
      <Public />
    </div>
  );
};

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.details.isAuthenticated,
});

export default connect(mapStateToProps)(App);
