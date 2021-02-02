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
  watchRenameItem,
  watchDeleteItem,
} from './files/file.sagas';

export default function* rootSaga() {
  yield all([
    watchDeleteItem(),
    watchRenameItem(),
    watchCreateFolder(),
    watchlistUserTrash(),
    watchUserLogin(),
    watchUserSignup(),
    watchIsUserLoaded(),
    watchlistUserFolder(),
  ]);
}
