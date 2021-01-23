import React from 'react';
import Menu from '@views/Menu';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

const MainLayout = ({ children }) => (
  <MainContaier>
    <Menu />
    <div>{children}</div>
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
`;
