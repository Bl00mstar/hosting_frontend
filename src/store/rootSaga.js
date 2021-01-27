import { all } from 'redux-saga/effects';
import {
  watchUserLogin,
  watchUserSignup,
  watchIsUserLoaded,
} from './user/user.sagas';

import { watchlistUserFolder } from './files/file.sagas';

export default function* rootSaga() {
  yield all([
    watchUserLogin(),
    watchUserSignup(),
    watchIsUserLoaded(),
    watchlistUserFolder(),
  ]);
}
