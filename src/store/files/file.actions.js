import fileTypes from './file.types';
// MOVE
export const getFolders = () => {
  return { type: fileTypes.SELECT_FOLDER };
};
export const setFolders = (data) => {
  return { type: fileTypes.MOVE_FOLDER, payload: data };
};
//
// ACTION MANAGEMENT
//

export const handleSelected = (data) => {
  return { type: fileTypes.ITEM_SELECTED, payload: data };
};

export const handleCheck = (data) => {
  return { type: fileTypes.ITEM_CHECKED, payload: data };
};
export const restoreItem = (data) => {
  return { type: fileTypes.RESTORE_ITEM, payload: data };
};
export const permDelete = (data) => {
  return { type: fileTypes.PERM_DELETE, payload: data };
};
//
// FILE MANAGEMENT
//
export const downloadItem = (data) => {
  return { type: fileTypes.DOWNLOAD_ITEM, payload: data };
};
export const uploadFile = (data) => {
  return { type: fileTypes.UPLOAD_FILE, payload: data };
};

//
// FOLDERS MANAGEMENT
//

export const clearAlertFiles = () => {
  return { type: fileTypes.ALERT_CLEAR };
};
export const alertFiles = (data) => {
  return { type: fileTypes.ALERT_INFO, payload: data };
};

export const createNewFolder = (data) => {
  return { type: fileTypes.CREATE_NEW_FOLDER, payload: data };
};
//
// Item management
//
export const itemSelected = (data) => {
  return { type: fileTypes.ITEM_SELECTED, payload: data };
};
export const deleteItem = (data) => {
  return { type: fileTypes.DELETE_ITEM, payload: data };
};
export const renameItem = (data) => {
  return { type: fileTypes.RENAME_ITEM, payload: data };
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
