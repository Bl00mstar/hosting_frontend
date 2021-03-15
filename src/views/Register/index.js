import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as Elems from '../Shared/public';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  userSignup,
  handleClearError,
  handleSignupClear,
} from '@store/user/user.actions';

const Signup = ({ signup, isAuthenticated }) => {
  const { register, handleSubmit, errors, watch } = useForm({
    criteriaMode: 'all',
    mode: 'onChange',
  });
  let navigate = useNavigate();
  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = (data, e) => {
    signup(data);
    e.target.reset();
  };
  if (isAuthenticated) {
    navigate('/');
  }
  return (
    <Elems.StyledRow>
      <Elems.PageTitle>Register</Elems.PageTitle>
      <Elems.PageDescription>
        Enter your details to register an account.
      </Elems.PageDescription>
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
            <Elems.StyledError>First name required.</Elems.StyledError>
          )}
          {errors?.lastName?.types?.required && (
            <Elems.StyledError>Last name required.</Elems.StyledError>
          )}
          <Elems.Input
            type="email"
            placeholder="E-mail"
            name="email"
            ref={register({
              required: true,
              pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            })}
          />
          {errors?.email?.types?.required && (
            <Elems.StyledError>Email required.</Elems.StyledError>
          )}
          {errors?.email?.types?.pattern && (
            <Elems.StyledError>Wrong email address.</Elems.StyledError>
          )}
          <Elems.Input
            type="password"
            placeholder="Password"
            name="password"
            ref={register({
              required: true,
              minLength: 6,
            })}
          />
          {errors?.password?.types?.required && (
            <Elems.StyledError>Password required.</Elems.StyledError>
          )}
          {errors?.password?.types?.minLength && (
            <Elems.StyledError>
              Password must have at least 6 characters.
            </Elems.StyledError>
          )}
          <Elems.Input
            type="password"
            placeholder="Confirm password"
            name="passwordConfirm"
            ref={register({
              validate: (value) =>
                value === password.current || 'The passwords do not match',
            })}
          />
          {errors.passwordConfirm && (
            <Elems.StyledError>
              {errors.passwordConfirm.message}
            </Elems.StyledError>
          )}
        </StyledInput>
        <Elems.StyledDiv>
          <Elems.StyledButton>Sign up</Elems.StyledButton>
        </Elems.StyledDiv>
      </form>
    </Elems.StyledRow>
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
