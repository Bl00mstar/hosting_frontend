import React, { useEffect } from 'react';
import Menu from '@components/PublicMenu';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useRoutes, useLocation } from 'react-router-dom';
import { routes } from '../../routes';
import styled from 'styled-components';
import Background from '@assets/Subtle-Stripes.svg';
import { isUserAuthenticated } from '@store/user/user.actions';
import Private from '@layout/Private';

const PublicLayout = ({ isUserLoaded, isAuthenticated }) => {
  const element = useRoutes(routes);
  let location = useLocation();
  useEffect(() => {
    isAuthenticated();
  }, [isAuthenticated]);

  if (!isUserLoaded) {
    return <div>Loading</div>;
  }

  if (isAuthenticated && location.pathname.includes('user')) {
    return <Private />;
  }

  return (
    <MainContaier>
      <Menu />
      <div>{element}</div>
      <Footer>@2021</Footer>
    </MainContaier>
  );
};

PublicLayout.propTypes = {
  children: PropTypes.node,
  isUserLoaded: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isUserLoaded: state.user.isUserLoaded,
});

const mapDispatchToProps = (dispatch) => {
  return {
    isAuthenticated: () => dispatch(isUserAuthenticated()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PublicLayout);

const MainContaier = styled.div`
  align-items: center;
  display: flex;
  flex-flow: column nowrap;
  background-image: url('${Background}');
  height: 100vh;
`;

const Footer = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: red;
  color: white;
  text-align: center;
`;