import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  userSignup,
  handleClearError,
  handleSignupClear,
} from '@store/user/user.actions';
import ErrorAlert from '@containers/LoginAlerts/ErrorAlert';
import SuccessAlert from '@containers/LoginAlerts/SuccessAlert';

const Signup = ({ signup, clearError, signupClear, isAuthenticated }) => {
  const { register, handleSubmit, errors, watch } = useForm({
    criteriaMode: 'all',
    mode: 'onChange',
  });
  let navigate = useNavigate();
  const password = useRef({});
  password.current = watch('password', '');

  useEffect(() => {
    clearError();
    signupClear();
  }, [clearError, signupClear]);

  const onSubmit = (data, e) => {
    signup(data);
    e.target.reset();
  };
  if (isAuthenticated) {
    navigate('/');
  }
  return (
    <StyledRow>
      <ErrorAlert />
      <SuccessAlert />
      <PageTitle>Register</PageTitle>
      <PageDescription>
        Enter your details to register an account.
      </PageDescription>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledInput>
          <HalfInput
            type="text"
            placeholder="First Name"
            name="firstName"
            ref={register({
              required: true,
            })}
          />
          <HalfInput
            type="text"
            placeholder="Last Name"
            name="lastName"
            ref={register({
              required: true,
            })}
          />
          {errors?.firstName?.types?.required && (
            <StyledError>First name required.</StyledError>
          )}
          {errors?.lastName?.types?.required && (
            <StyledError>Last name required.</StyledError>
          )}
          <Input
            type="email"
            placeholder="E-mail"
            name="email"
            ref={register({
              required: true,
              pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            })}
          />
          {errors?.email?.types?.required && (
            <StyledError>Email required.</StyledError>
          )}
          {errors?.email?.types?.pattern && (
            <StyledError>Wrong email address.</StyledError>
          )}
          <Input
            type="password"
            placeholder="Password"
            name="password"
            ref={register({
              required: true,
              minLength: 6,
            })}
          />
          {errors?.password?.types?.required && (
            <StyledError>Password required.</StyledError>
          )}
          {errors?.password?.types?.minLength && (
            <StyledError>Password must have at least 6 characters.</StyledError>
          )}
          <Input
            type="password"
            placeholder="Confirm password"
            name="passwordConfirm"
            ref={register({
              validate: (value) =>
                value === password.current || 'The passwords do not match',
            })}
          />
          {errors.passwordConfirm && (
            <StyledError>{errors.passwordConfirm.message}</StyledError>
          )}
        </StyledInput>
        <StyledDiv>
          <StyledButton>Sign up</StyledButton>
        </StyledDiv>
      </form>
    </StyledRow>
  );
};

Signup.propTypes = {
  signup: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  signupClear: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.details.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (x) => dispatch(userSignup(x)),
    clearError: () => dispatch(handleClearError()),
    signupClear: () => dispatch(handleSignupClear()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

export const StyledError = styled.p`
  color: red;
`;

export const PageTitle = styled.div`
  font-size: 2.5rem;
  margin-top: 4rem;
`;
export const PageDescription = styled.div`
  font-size: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledRow = styled.div`
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;

export const HalfInput = styled.input`
  height: 40px;
  width: 50%;
  border: 2px solid #aaa;
  border-radius: 20px;
  padding-left: 20px;
  margin: 8px 0;
  outline: none;
  box-sizing: border-box;
  transition: 0.3s;
  :hover {
    border-color: #993399;
    box-shadow: 0 0 8px 0 #990099;
  }
  :focus {
    border-color: #993399;
    box-shadow: 0 0 8px 0 #990099;
  }
`;

const Input = styled.input`
  height: 40px;
  width: 100%;
  border: 2px solid #aaa;
  border-radius: 20px;
  padding-left: 20px;
  margin: 8px 0;
  outline: none;
  box-sizing: border-box;
  transition: 0.3s;
  :hover {
    border-color: #993399;
    box-shadow: 0 0 8px 0 #990099;
  }
  :focus {
    border-color: #993399;
    box-shadow: 0 0 8px 0 #990099;
  }
`;

const StyledInput = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 350px;
  select {
    top: 8px;
    font-size: 18px;
    outline: none;
    right: 0.5rem;
  }
  svg {
    position: absolute;
    left: 0;
    top: 8px;
    padding: 9px 8px;
    fill: black;
    transition: 0.3s;
    :hover {
      fill: #990099;
    }
  }
  input:focus + svg {
    fill: #990099;
  }
  &.inputWithIcon {
    position: relative;
  }
`;

export const StyledButton = styled(motion.button)`
  position: relative;
  font-size: 1rem;
  letter-spacing: 4px;
  line-height: 2.5rem;
  display: block;
  text-align: center;
  border: 1px solid #ba55d3;
  color: #ba55d3;
  background-color: transparent;
  border-radius: 0.2rem;
  width: 10rem;
  height: 2.5rem;
  margin-top: 1.5rem;
  cursor: pointer;
  transition: all 1s;
  background-size: 200%;
  background-position: 100% 0;
  background-image: linear-gradient(45deg, #ba55d3 50%, transparent 50%);
  :focus {
    outline: none;
  }
  :hover {
    background-position: 0 100%;
    color: ${({ theme }) => theme.colors.ground};
  }
`;
