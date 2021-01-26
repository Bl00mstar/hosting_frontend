import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MainLayout from '@layout/MainLayout/MainLayout';

const App = () => {
  return (
    <div className="App">
      <MainLayout />
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
