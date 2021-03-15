import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { userLogin, handleClearError } from '@store/user/user.actions';
import Ellipsis from '@components/Preloaders/EllipsisPreloader';
import * as Elems from '../Shared/public';

const Login = ({ login, clearError, userLoading, isAuthenticated }) => {
  const { register, handleSubmit, errors } = useForm({
    criteriaMode: 'all',
    mode: 'onChange',
  });
  let navigate = useNavigate();

  useEffect(() => {
    clearError();
  }, [clearError]);

  const onSubmit = (data, e) => {
    clearError();
    login(data);
    e.target.reset();
  };

  if (isAuthenticated) {
    navigate('/user/dashboard');
  }

  return (
    <Elems.StyledRow>
      {userLoading && <Ellipsis />}
      <Elems.PageTitle>Login</Elems.PageTitle>
      <Elems.PageDescription>
        To log in, enter your email and password.
      </Elems.PageDescription>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Elems.StyledInput>
          <Elems.Input
            type="text"
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
            })}
          ></Elems.Input>
          {errors?.password?.types?.required && (
            <Elems.StyledError>Password required.</Elems.StyledError>
          )}
          {errors?.password?.types?.pattern && (
            <Elems.StyledError>Wrong password pattern.</Elems.StyledError>
          )}
        </Elems.StyledInput>
        <Elems.StyledDiv>
          <Elems.StyledButton>Login</Elems.StyledButton>
        </Elems.StyledDiv>
      </form>
    </Elems.StyledRow>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  userLoading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  userLoading: state.user.details.isLoading,
  isAuthenticated: state.user.details.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => {
  return {
    login: (x) => dispatch(userLogin(x)),
    clearError: () => dispatch(handleClearError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
