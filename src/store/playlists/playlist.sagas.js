import { put, takeEvery } from '@redux-saga/core/effects';
import playlistTypes from './playlist.types';
import { apiLink } from '@utils/api';
import {
  getPlaylistHelper,
  postPlaylistHelper,
  deletePlaylistHelper,
  editPlaylistHelper,
} from './playlist.helpers';
import { setPlaylists } from './playlist.actions';

export function* watchGetFileData() {
  yield takeEvery(playlistTypes.GET_FILE_DATA, getFileData);
}
function* getFileData({ payload }) {
  try {
    yield getPlaylistHelper(apiLink + '/playlist', payload);
    yield console.log('asd');
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
