import { userRequest, isAuthenticated } from './user.helpers';
import userTypes from './user.types';
import { put, takeEvery } from 'redux-saga/effects';
import { apiLink } from '@utils/api';
import {
  handleUserError,
  handleSignupSuccess,
  handleSignupClear,
  handleClearError,
  userLoading,
  userData,
  isUserLoaded,
} from './user.actions';

export function* watchUserLogin() {
  yield takeEvery(userTypes.USER_LOGIN, userLogin);
}

function* userLogin(loginData) {
  yield put(userLoading());
  try {
    const data = yield userRequest(
      'POST',
      apiLink + '/user/login',
      loginData.payload
    );
    yield put(userData(data));
  } catch (error) {
    yield put(handleUserError(error));
  }
}

export function* watchUserSignup() {
  yield takeEvery(userTypes.USER_SIGNUP, userSignup);
}

function* userSignup(signupData) {
  yield put(handleSignupClear());
  yield put(handleClearError());
  try {
    const data = yield userRequest(
      'POST',
      apiLink + '/user/signup',
      signupData.payload
    );
    yield put(handleSignupSuccess(data));
  } catch (error) {
    yield put(handleUserError(error));
  }
}

export function* watchIsUserLoaded() {
  yield takeEvery(userTypes.CHECK_USER_AUTHENTICATED, isUserAuthenticated);
}

function* isUserAuthenticated() {
  try {
    const data = yield isAuthenticated('GET', apiLink + '/user/auth');
    yield put(userData(data));
    yield put(isUserLoaded());
  } catch (error) {
    yield put(isUserLoaded());
  }
}
