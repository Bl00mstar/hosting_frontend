import fileTypes from './file.types';

export const setDirectoryPath = (data) => {
  return { type: fileTypes.SET_DIRECTORY_PATH, payload: data };
};

export const getUserFiles = (data) => {
  return { type: fileTypes.GET_FILE_LIST, payload: data };
};
export const putFileData = (data) => {
  return { type: fileTypes.SET_FILE_LIST, payload: data };
};

export const loadUserFiles = () => {
  return { type: fileTypes.LOAD_FILE_LIST };
};

export const getUserTrash = () => {
  return { type: fileTypes.GET_TRASH_LIST };
};

export const putTrashData = (data) => {
  return { type: fileTypes.SET_TRASH_LIST, payload: data };
};

export const loadUserTrash = () => {
  return { type: fileTypes.LOAD_TRASH_LIST };
};
