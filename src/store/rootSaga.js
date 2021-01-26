import { all } from 'redux-saga/effects';
import {
  watchUserLogin,
  watchUserSignup,
  watchIsUserLoaded,
} from './user/user.sagas';

export default function* rootSaga() {
  yield all([watchUserLogin(), watchUserSignup(), watchIsUserLoaded()]);
}
