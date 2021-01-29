import fileTypes from './file.types';

//
// FOLDERS MANAGEMENT
//

export const createNewFolder = (data) => {
  return { type: fileTypes.CREATE_NEW_FOLDER, payload: data };
};
// export const createPatternFolder = (data) => {
//   return { type: fileTypes.CREATE_PATTERN_FOLDER, payload: data };
// };
// export const createRandomFolder = (data) => {
//   return { type: fileTypes.CREATE_RANDOM_FOLDER, payload: data };
// };
export const deleteFolder = (data) => {
  return { type: fileTypes.DELETE_FOLDER, payload: data };
};
export const renameFolder = (data) => {
  return { type: fileTypes.RENAME_FOLDER, payload: data };
};

//
// LOAD & GET FILES
//
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
//
// TRASH ACTIONS
//
export const getUserTrash = () => {
  return { type: fileTypes.GET_TRASH_LIST };
};

export const putTrashData = (data) => {
  return { type: fileTypes.SET_TRASH_LIST, payload: data };
};

export const loadUserTrash = () => {
  return { type: fileTypes.LOAD_TRASH_LIST };
};
