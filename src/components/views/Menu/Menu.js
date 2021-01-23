import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { routes } from '../../../routes';
import media from '@media/mediaResolution';

const DesktopMenu = () => {
  const location = useLocation();
  return (
    <StyledNav>
      <StyledDivRight>
        <NavLinksWrapper>
          {routes.map(({ description, path }) => (
            <StyledLi key={description}>
              <NavLink
                to={`/${path}`}
                className={path === location.pathname ? 'active' : ''}
              >
                {description}
              </NavLink>
            </StyledLi>
          ))}
        </NavLinksWrapper>
      </StyledDivRight>
    </StyledNav>
  );
};

export default DesktopMenu;

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

const StyledDivRight = styled.div`
  float: right;
`;

const NavLinksWrapper = styled.ul``;

const StyledLi = styled.li`
  display: inline-block;
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
  transition: all 450ms linear;
  border-bottom: 1px solid transparent;
  &.active {
    border-bottom: 1px solid #ba55d3;
  }
  &:hover {
    border-bottom: 1px solid #ee82ee;
  }
`;
