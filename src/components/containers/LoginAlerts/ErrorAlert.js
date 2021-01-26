import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

const ErrorAlert = ({ isError, msgError }) => {
  return (
    isError && (
      <StyledBoxError>
        <StyledSuccess>{msgError}</StyledSuccess>
      </StyledBoxError>
    )
  );
};

ErrorAlert.propTypes = {
  isError: PropTypes.bool.isRequired,
  msgError: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  isError: state.user.error.isError,
  msgError: state.user.error.msgError,
});

export default connect(mapStateToProps)(ErrorAlert);

const StyledBoxError = styled.div`
  margin-top: 1rem;
  border: 1px solid #b22222;
  box-sizing: border-box;
  box-shadow: 0 0 8px 0 #cd5c5c;
`;

const StyledSuccess = styled.p`
  color: red;
`;
