import React from 'react';
import '../../../layout/User/style.css';
import { routes } from '../../../routes';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Sidebar = () => {
  return (
    <div className="container-fluid">
      <div className="col-md-2 d-sm-none d-xs-none d-md-block bg-light sidebar">
        <nav className="col-md-2 d-sm-none d-xs-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              {routes.map(({ description, path, type }, key) => {
                if (type.includes('user')) {
                  return (
                    <li className="nav-item" key={key}>
                      <NavLink to={`/${path}`} className="nav-link text-light">
                        {description}
                      </NavLink>
                    </li>
                  );
                }
              })}

              <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Manage files</span>
                <a className="d-flex align-items-center text-muted" href="#" />
              </h6>
              {routes.map(({ description, path, type }, key) => {
                if (type.includes('files')) {
                  return (
                    <li className="nav-item" key={key}>
                      <NavLink
                        to={`/${path}`}
                        className="nav-link text-left text-light"
                      >
                        {description}
                      </NavLink>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

const NavLink = styled(Link)``;
