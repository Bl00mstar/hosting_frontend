import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogout } from '@store/user/user.actions';

const Navbar = ({ logout }) => {
  let navigate = useNavigate();
  return (
    <div className="container-fluid">
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
          img
        </a>

        <ul className="navbar-nav px-4">
          <li className="nav-item text-nowrap">
            <a className="nav-link" onClick={() => logout() && navigate('/')}>
              Sign out
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(userLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
