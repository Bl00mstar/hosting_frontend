import { all } from 'redux-saga/effects';
import {
  watchUserLogin,
  watchUserSignup,
  watchIsUserLoaded,
} from './user/user.sagas';

import {
  watchTrashDelete,
  watchTrashRestore,
  watchlistUserFolder,
  watchlistUserTrash,
  watchCreateFolder,
  watchRenameItem,
  watchDeleteItem,
  watchDownloadItem,
  watchGetFolders,
  watchMoveElements,
} from './files/file.sagas';

export default function* rootSaga() {
  yield all([
    watchTrashDelete(),
    watchTrashRestore(),
    watchMoveElements(),
    watchGetFolders(),
    watchDownloadItem(),
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
