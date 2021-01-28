import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { routes } from '../../../routes';
import media from '@media/mediaResolution';
import Logo from '@assets/cfbrand.svg';
import { useNavigate } from 'react-router-dom';

const DesktopMenu = ({ isLogged }) => {
  const location = useLocation();
  let navigate = useNavigate();

  if (isLogged) {
    return (
      <StyledNav>
        <NavImage>
          <StyledImage src={Logo} onClick={() => navigate('/')}></StyledImage>
        </NavImage>
        <StyledDivRight>
          <NavLinksWrapper>
            {routes.map(({ description, path, type }) => {
              if (type.includes('private')) {
                return (
                  <StyledLi key={description}>
                    <NavLink
                      to={`/${path}`}
                      className={path === location.pathname ? 'active' : ''}
                      style={{ textDecoration: 'none' }}
                    >
                      {description}
                    </NavLink>
                  </StyledLi>
                );
              }
            })}
          </NavLinksWrapper>
        </StyledDivRight>
      </StyledNav>
    );
  }
  return (
    <StyledNav>
      <NavImage>
        <StyledImage src={Logo} onClick={() => navigate('/')}></StyledImage>
      </NavImage>
      <StyledDivRight>
        <NavLinksWrapper>
          {routes.map(({ description, path, type }) => {
            if (type.includes('public')) {
              return (
                <StyledLi key={description}>
                  <NavLink
                    to={`/${path}`}
                    className={path === location.pathname ? 'active' : ''}
                    style={{ textDecoration: 'none' }}
                  >
                    {description}
                  </NavLink>
                </StyledLi>
              );
            }
          })}
        </NavLinksWrapper>
      </StyledDivRight>
    </StyledNav>
  );
};

DesktopMenu.propTypes = {
  isLogged: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLogged: state.user.details.isAuthenticated,
});

export default connect(mapStateToProps)(DesktopMenu);

const StyledNav = styled.nav`
  overflow: hidden;
  @media (min-width: 1200px) {
    width: 70%;
  }
  ${media.high`
  width: 80%;
  `}
  ${media.medium`
  width: 90%;
  `}
  ${media.tablet`
  width: 90%;
  `}
  ${media.small`
  width: 90%;
  `}
`;

const StyledImage = styled.img`
  width: 80px;
  height: auto;
  cursor: pointer;
  ${media.high`
  width: 75px;
  `}
  ${media.medium`
  width: 70px;
  `}
  ${media.tablet`
  width: 65px;
  `}
  ${media.small`
  width: 60px;
  `}
`;

const StyledDivRight = styled.div`
  float: right;
`;

const NavLinksWrapper = styled.ul``;
const NavImage = styled.div`
  display: inline-block;
  padding: 10px 22px;
  svg {
    width: 30px;
  }
`;
const StyledLi = styled.li`
  display: inline-block;
  padding: 10px 10px;
  a {
    display: block;
    padding: 6px 22px;
    text-decoration: none;
  }
`;

const NavLink = styled(Link)`
  position: relative;
  color: white;
  color: var(--text);
  right: 0;
  transition: all 1s ease;
  border-bottom: 1px solid transparent;
  &.active {
    border-bottom: 1px solid #ba55d3;
  }
  &:hover {
    border-bottom: 1px solid #ee82ee;
  }
`;
