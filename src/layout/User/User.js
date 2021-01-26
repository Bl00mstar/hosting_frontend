import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '@views/Navbar';
import Sidebar from '@views/Sidebar';
import Source from '@views/Source';
import styled from 'styled-components';
import { routes } from '../../routes';
import { useRoutes, useNavigate } from 'react-router-dom';
import './style.css';

const User = ({ isAuthenticated }) => {
  const element = useRoutes(routes);
  let navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('account/login');
  }

  return (
    <DashboardStyled>
      <Navbar />
      <Sidebar />
      <Source>{element}</Source>
    </DashboardStyled>
  );
};

User.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.details.isAuthenticated,
});

export default connect(mapStateToProps)(User);

const DashboardStyled = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
`;
