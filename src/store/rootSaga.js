import { all } from 'redux-saga/effects';
import {
  watchUserLogin,
  watchUserSignup,
  watchIsUserLoaded,
} from './user/user.sagas';

import { watchlistUserFolder, watchlistUserTrash } from './files/file.sagas';

export default function* rootSaga() {
  yield all([
    watchlistUserTrash(),
    watchUserLogin(),
    watchUserSignup(),
    watchIsUserLoaded(),
    watchlistUserFolder(),
  ]);
}
