import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { routes } from '../../../routes';

const DesktopMenu = () => {
  const location = useLocation();
  return (
    <StyledNav>
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
    </StyledNav>
  );
};

export default DesktopMenu;

const StyledNav = styled.nav`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
`;

const NavLinksWrapper = styled.ul`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  padding-inline-start: 0px;
`;

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
