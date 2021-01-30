import { all } from 'redux-saga/effects';
import {
  watchUserLogin,
  watchUserSignup,
  watchIsUserLoaded,
} from './user/user.sagas';

import {
  watchlistUserFolder,
  watchlistUserTrash,
  watchCreateFolder,
} from './files/file.sagas';

export default function* rootSaga() {
  yield all([
    watchCreateFolder(),
    watchlistUserTrash(),
    watchUserLogin(),
    watchUserSignup(),
    watchIsUserLoaded(),
    watchlistUserFolder(),
  ]);
}
