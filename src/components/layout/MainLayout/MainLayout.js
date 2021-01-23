import React from 'react';
import Menu from '@views/Menu';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
// import media from '@media/mediaResolution';

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
  display: block;
  flex-flow: column nowrap;
`;

// const StyledMain = styled.main`
//   ${media.xmedium`
//     width: 100%;
//    height:95%;
// `}
//   ${media.medium`
//     width: 100%;
//    height:100%;
// `}
// ${media.tablet`
//     width: 100%;
//    height:100%;
// `}
// ${media.small`
// width: 100%;
//    height:100%;
// `}
// `;
