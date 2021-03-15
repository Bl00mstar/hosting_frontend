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

import { setMessage } from '../alerts/alert.actions';

export function* watchChangeUserData() {
  yield takeEvery(userTypes.CHANGE_USER_DATA, changeUserData);
}

function* changeUserData({ payload }) {
  try {
    yield userRequest('POST', `${apiLink}/user/${payload._id}`, payload);
    yield put(setMessage({ message: 'Data changed', type: 'success' }));
  } catch (error) {
    yield put(setMessage({ message: error, type: 'danger' }));
  }
}

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
    yield put(setMessage({ message: 'Login successfull', type: 'success' }));
  } catch (error) {
    yield put(setMessage({ message: error, type: 'danger' }));
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
    yield put(setMessage({ message: 'Register successfull', type: 'success' }));
  } catch (error) {
    yield put(setMessage({ message: error, type: 'danger' }));
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
