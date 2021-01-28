import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SuccessAlert = ({ isSignupSuccess, signupSuccessMessage }) => {
  let navigate = useNavigate();
  return (
    isSignupSuccess && (
      <StyledBox>
        <StyledSuccess>{signupSuccessMessage.msg}</StyledSuccess>
        <StyledSuccessHref onClick={() => navigate('/account/login')}>
          Go to login
        </StyledSuccessHref>
      </StyledBox>
    )
  );
};

SuccessAlert.propTypes = {
  isSignupSuccess: PropTypes.bool.isRequired,
  signupSuccessMessage: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isSignupSuccess: state.user.action.isSignupSuccess,
  signupSuccessMessage: state.user.action.signupSuccessMessage,
});

export default connect(mapStateToProps)(SuccessAlert);

const StyledSuccessHref = styled.p`
  color: green;
  cursor: pointer;
`;

const StyledBox = styled.div`
  margin-top: 1rem;
  border: 1px solid green;
  box-sizing: border-box;
  box-shadow: 0 0 8px 0 #228b22;
`;

const StyledSuccess = styled.p`
  margin-top: 1rem;
  color: green;
`;
