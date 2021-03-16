import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Elems from '@assets/js/components/loginregister/loginregisterStyle.js';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { userSignup } from '@store/user/user.actions';

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
        <Elems.StyledInput>
          <Elems.HalfInput
            type="text"
            placeholder="First Name"
            name="firstName"
            ref={register({
              required: true,
            })}
          />
          <Elems.HalfInput
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
        </Elems.StyledInput>
        <Elems.StyledDiv>
          <Elems.StyledButton>Sign up</Elems.StyledButton>
        </Elems.StyledDiv>
      </form>
    </Elems.StyledRow>
  );
};

Signup.propTypes = {
  signup: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.details.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (x) => dispatch(userSignup(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
