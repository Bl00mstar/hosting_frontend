import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/account/login');
  }

  return <div>storage/fixlist/lastactions</div>;
};

Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.details.isAuthenticated,
});

export default connect(mapStateToProps)(Dashboard);
