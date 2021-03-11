import { put, takeEvery } from '@redux-saga/core/effects';
import playlistTypes from './playlist.types';
import { apiLink } from '@utils/api';
import {
  getPlaylistHelper,
  postPlaylistHelper,
  deletePlaylistHelper,
  editPlaylistHelper,
} from './playlist.helpers';
import {
  setPlaylists,
  setActiveFile,
  setFilesPlaylist,
} from './playlist.actions';

export function* watchFilesFromPlaylist() {
  yield takeEvery(playlistTypes.PLAYLIST_FILES, filesFromPlaylist);
}
function* filesFromPlaylist({ payload }) {
  try {
    const data = yield getPlaylistHelper(apiLink + `/playlist/${payload}`);
    yield put(setFilesPlaylist(data.msg));
  } catch (error) {
    yield console.log(error);
  }
}

export function* watchFileFromPlaylist() {
  yield takeEvery(playlistTypes.PLAYLIST_DELETE_FILE, fileFromPlaylist);
}
function* fileFromPlaylist({ payload }) {
  try {
    const { playlist, file } = payload;
    yield deletePlaylistHelper(apiLink + `/playlist/${playlist}/${file}`);
    const data = yield getPlaylistHelper(apiLink + '/playlist');
    yield put(setPlaylists(data.msg));
  } catch (error) {
    yield console.log(error);
  }
}

export function* watchFileToPlaylist() {
  yield takeEvery(playlistTypes.PLAYLIST_ADD_FILE, fileToPlaylist);
}
function* fileToPlaylist({ payload }) {
  try {
    const { playlist, file } = payload;
    yield editPlaylistHelper(apiLink + `/playlist/${playlist}/${file}`);
    const data = yield getPlaylistHelper(apiLink + '/playlist');
    yield put(setPlaylists(data.msg));
  } catch (error) {
    yield console.log(error);
  }
}

export function* watchGetFileData() {
  yield takeEvery(playlistTypes.GET_FILE_DATA, getFileData);
}
function* getFileData({ payload }) {
  try {
    const data = yield getPlaylistHelper(apiLink + '/playlist/file/' + payload);
    yield put(setActiveFile(data.msg));
  } catch (error) {
    yield console.log(error);
  }
}

export function* watchGetPlaylists() {
  yield takeEvery(playlistTypes.GET_PLAYLISTS, getPlaylists);
}
function* getPlaylists() {
  try {
    const data = yield getPlaylistHelper(apiLink + '/playlist');
    yield put(setPlaylists(data.msg));
  } catch (error) {
    yield console.log(error);
  }
}

export function* watchPostPlaylist() {
  yield takeEvery(playlistTypes.ADD_PLAYLIST, postPlaylist);
}
function* postPlaylist({ payload }) {
  try {
    yield postPlaylistHelper(apiLink + '/playlist', payload);
    yield getPlaylists();
  } catch (error) {
    yield console.log(error);
  }
}

export function* watchDeletePlaylist() {
  yield takeEvery(playlistTypes.DELETE_PLAYLIST, deletePlaylist);
}
function* deletePlaylist({ payload }) {
  try {
    yield deletePlaylistHelper(apiLink + '/playlist/' + payload);
    yield getPlaylists();
  } catch (error) {
    yield console.log(error);
  }
}

export function* watchUpdatePlaylist() {
  yield takeEvery(playlistTypes.EDIT_PLAYLIST, updatePlaylist);
}
function* updatePlaylist({ payload }) {
  const { id } = payload;
  try {
    yield editPlaylistHelper(apiLink + '/playlist/' + id, payload);
    yield getPlaylists();
  } catch (error) {
    yield console.log(error);
  }
}
