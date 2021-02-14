import { fileRequest, postPathGetFiles, download } from './file.helpers';
import fileTypes from './file.types';
import { put, takeEvery } from 'redux-saga/effects';
import { apiLink } from '@utils/api';
import {
  loadUserFiles,
  putFileData,
  loadUserTrash,
  putTrashData,
  alertFiles,
  setFolders,
  handleCheck,
  handleSelected,
} from './file.actions';
import { saveAs } from 'file-saver';

export function* watchGetFolders() {
  yield takeEvery(fileTypes.SELECT_FOLDER, getFolders);
}
function* getFolders(payload) {
  try {
    const data = yield postPathGetFiles(apiLink + '/file/folders', payload);
    yield put(setFolders(data));
  } catch (error) {
    yield console.log(error);
  }
}

export function* watchPermDelete() {
  yield takeEvery(fileTypes.PERM_DELETE, permDelete);
}
function* permDelete({ payload }) {
  try {
    const data = yield postPathGetFiles(
      apiLink + '/file/trash/delete',
      payload
    );
    console.log(data);
  } catch (error) {
    yield console.log(error);
  }
}

export function* watchRestoreItem() {
  yield takeEvery(fileTypes.RESTORE_ITEM, restoreItem);
}
function* restoreItem({ payload }) {
  try {
    const data = yield postPathGetFiles(
      apiLink + '/file/trash/restore',
      payload
    );
    console.log(data);
  } catch (error) {
    yield console.log(error);
  }
}

export function* watchDownloadItem() {
  yield takeEvery(fileTypes.DOWNLOAD_ITEM, downloadItem);
}
function* downloadItem({ payload }) {
  try {
    console.log(payload);
    const { id, name } = payload;
    console.log(id);
    const data = yield download(apiLink + `/media/${id}`);
    saveAs(data, name);
  } catch (error) {
    console.log(error);
    yield console.log('asd');
  }
}

export function* watchDeleteItem() {
  yield takeEvery(fileTypes.DELETE_ITEM, deleteItem);
}
function* deleteItem({ payload }) {
  console.log(payload);
  try {
    const data = yield postPathGetFiles(apiLink + '/file/delete', payload);
    console.log(data);
    yield console.log('asd');
  } catch (error) {
    console.log(error);
    yield console.log('asd');
  }
}

export function* watchRenameItem() {
  yield takeEvery(fileTypes.RENAME_ITEM, renameItem);
}
function* renameItem({ payload }) {
  try {
    const data = yield postPathGetFiles(apiLink + '/file/rename', payload);
    yield put(
      alertFiles({
        message: data.msg,
        type: 'success',
      })
    );
    yield put(handleSelected({ type: '', id: '', name: '' }));
    yield put(handleCheck([]));
  } catch (error) {
    yield put(
      alertFiles({
        message: error,
        type: 'error',
      })
    );
  }
}

export function* watchCreateFolder() {
  yield takeEvery(fileTypes.CREATE_NEW_FOLDER, createFolder);
}

function* createFolder({ payload }) {
  const { file_type } = payload;
  try {
    if (file_type === 'pattern') {
      const data = yield postPathGetFiles(
        apiLink + '/file/folder/createPattern',
        payload
      );

      yield put(alertFiles(data.msg));
    } else if (file_type === 'random') {
      const data = yield postPathGetFiles(
        apiLink + '/file/folder/createRandom',
        payload
      );

      yield put(alertFiles(data.msg));
    } else {
      const data = yield postPathGetFiles(
        apiLink + '/file/createNewFolder',
        payload
      );
      console.log(data.msg);
      yield put(alertFiles({ message: data.msg, type: 'success' }));
    }
  } catch (error) {
    console.log(error);
    yield put(alertFiles({ message: error, type: 'error' }));
  }
}

export function* watchlistUserFolder() {
  yield takeEvery(fileTypes.GET_FILE_LIST, listFolder);
}

function* listFolder({ payload }) {
  yield put(loadUserFiles());
  try {
    const data = yield postPathGetFiles(apiLink + '/file', payload);
    console.log('asd');
    console.log(data);
    yield put(putFileData(data));
  } catch (error) {
    console.log(error);
  }
}

export function* watchlistUserTrash() {
  yield takeEvery(fileTypes.GET_TRASH_LIST, listTrash);
}

function* listTrash() {
  yield put(loadUserTrash());
  try {
    const data = yield fileRequest(apiLink + '/file/trash');
    yield put(putTrashData(data));
  } catch (error) {
    console.log(error);
  }
}
