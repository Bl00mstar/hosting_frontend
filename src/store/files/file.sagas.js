import { fileRequest } from './file.helpers';
import fileTypes from './file.types';
import { takeEvery } from 'redux-saga/effects';
import { apiLink } from '@utils/api';

export function* watchlistUserFolder() {
  yield takeEvery(fileTypes.FILE_LIST, listFolder);
}

function* listFolder(name) {
  try {
    yield console.log(name);
    const data = yield fileRequest(apiLink + '/file');
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
