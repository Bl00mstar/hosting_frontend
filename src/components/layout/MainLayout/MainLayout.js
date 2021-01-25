import React from 'react';
import Menu from '@views/Menu';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Background from '@assets/Subtle-Stripes.svg';

const MainLayout = ({ children }) => (
  <MainContaier>
    <Menu />
    <div>{children}</div>
    <Footer>@2021</Footer>
  </MainContaier>
);

MainLayout.propTypes = {
  children: PropTypes.node,
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(MainLayout);

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
