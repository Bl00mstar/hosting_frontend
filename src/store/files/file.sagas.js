import { fileRequest, postPathGetFiles } from './file.helpers';
import fileTypes from './file.types';
import { put, takeEvery } from 'redux-saga/effects';
import { apiLink } from '@utils/api';
import {
  loadUserFiles,
  putFileData,
  loadUserTrash,
  putTrashData,
} from './file.actions';

export function* watchCreateFolder() {
  yield takeEvery(fileTypes.CREATE_NEW_FOLDER, createFolder);
}

function* createFolder({ payload }) {
  console.log(payload);
  const { file_type } = payload;
  try {
    if (file_type === 'pattern') {
      const data = yield postPathGetFiles(
        apiLink + '/file/folder/createPattern',
        payload
      );
      console.log(data);
    } else if (file_type === 'random') {
      const data = yield postPathGetFiles(
        apiLink + '/file/folder/createRandom',
        payload
      );
      console.log(data);
    } else {
      const data = yield postPathGetFiles(
        apiLink + '/file/folder/createNew',
        payload
      );
      console.log(data);
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchlistUserFolder() {
  yield takeEvery(fileTypes.GET_FILE_LIST, listFolder);
}

function* listFolder({ payload }) {
  yield put(loadUserFiles());
  try {
    const data = yield postPathGetFiles(apiLink + '/file', payload);
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
