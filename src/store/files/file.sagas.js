import { fileRequest, postPathGetFiles } from './file.helpers';
import fileTypes from './file.types';
import { put, takeEvery } from 'redux-saga/effects';
import { apiLink } from '@utils/api';
import {
  loadUserFiles,
  putFileData,
  loadUserTrash,
  putTrashData,
  alertFolderError,
  alertFolderSuccess,
} from './file.actions';

export function* watchDownloadItem() {
  yield takeEvery(fileTypes.DOWNLOAD_ITEM, downloadItem);
}
function* downloadItem({ payload }) {
  console.log(payload);
  try {
    console.log('asd');
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
    const data = yield postPathGetFiles(apiLink + '/media/delete', payload);
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
    const data = yield postPathGetFiles(apiLink + '/media/rename', payload);
    console.log(data);
    yield console.log('asd');
  } catch (error) {
    console.log(error);
    yield console.log('asd');
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
      console.log(data);
      yield put(alertFolderSuccess(data.msg));
    } else if (file_type === 'random') {
      const data = yield postPathGetFiles(
        apiLink + '/file/folder/createRandom',
        payload
      );
      console.log(data);
      yield put(alertFolderSuccess(data.msg));
    } else {
      const data = yield postPathGetFiles(
        apiLink + '/file/createNewFolder',
        payload
      );
      yield put(alertFolderSuccess(data.msg));
    }
  } catch (error) {
    console.log(error);
    yield put(alertFolderError(error));
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
