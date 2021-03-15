import { all } from 'redux-saga/effects';

import {
  watchGetPlaylists,
  watchPostPlaylist,
  watchDeletePlaylist,
  watchUpdatePlaylist,
  watchGetFileData,
  watchFileFromPlaylist,
  watchFileToPlaylist,
  watchFilesFromPlaylist,
} from './playlists/playlist.sagas';

import {
  watchUserLogin,
  watchUserSignup,
  watchIsUserLoaded,
  watchChangeUserData,
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
    watchFilesFromPlaylist(),
    watchFileFromPlaylist(),
    watchFileToPlaylist(),
    watchGetFileData(),
    watchGetPlaylists(),
    watchPostPlaylist(),
    watchDeletePlaylist(),
    watchUpdatePlaylist(),
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
    watchChangeUserData(),
  ]);
}
